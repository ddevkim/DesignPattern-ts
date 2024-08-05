# 어댑터 패턴

한 객체의 인터페이스를 다른 객체가 이해할 수 있도록 변환하는 특별한 객체

어댑터는 데이터를 다양한 형식으로 변환할 수 있을 뿐만 아니라 다른 인터페이스를 가진 객체들이 협업하는 데에도 도움을 줄 수 있음


## 요약하면

호환되지 않는 두 관계를, 변환기를 구현하여 작동하게 하는 일.


## 호환되지 않는 두 관계라는 것은

한국 가게와 한국 전용 카드가 있다면

```ts
class KoreaRestaurant {
    private krw;
    getPrice() {
        return krw;
    }
}

class KoreaCreditCard {
    private money;
    payment(restaurant: KoreaRestaurant) {
        money -= restaurant.getPrice();
    }
}
``` 

```ts
const kr_restaurant = new KoreaRestaurant();
const kr_creditcard = new KoreaCreditCard();
kr_creditcard.payment(kr_restaurant);
```

만약 일본여행을 가서 일본 가게에서 결제를 하려고 한다.

```ts
class JapanRestuarant {
    private jpy;
    getPrice() {
        return jpy;
    }
}
```

결제할 수 없는 상황

```ts
const jp_restaurant = new JapanRestaurant();
const kr_creditcard = new KoreaCreditCard();
kr_creditcard.payment(jp_restaurant);   // X
```

## 어댑터라면

```ts
class RestaurantAdapter extends KoreaRestaurant {
    private restaurant: JapanRestaurant;

    constructor(restaurant: JapanRestaurant) {
        super();
        this.restaurant = restaurant;
    }
    
    getPrice() {
        return this.restaurant.jpy * 1.1;
    }
}
```

```ts
const kr_restaurant = new KoreaRestaurant();
const kr_creditcard = new KoreaCreditCard();
kr_creditcard.payment(kr_restaurant);

const jp_restaurant = new JapanRestaurant();
kr_creditcard.payment(jp_restaurant);   // X

const jp_adapter = new RestaurantAdapter(jp_restaurant);
kr_creditcard.payment(jp_adapter);      // O
```



A 를 상속받고,
B 를 변수로 가진 새 Adapter 가
B 의 데이터를 가공하여 A 의 기능을 하게 하는 일