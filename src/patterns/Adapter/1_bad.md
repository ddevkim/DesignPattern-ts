```ts
// 원화만 취급하는 한국 음식점
class KoreaRestaurant {
  private krw = 1000;

  getPrice() {
    return this.krw;
  }
}

// 엔화만 취급하는 일본 음식점
class JapanRestaurant {
  private jpy = 1000;

  getPrice() {
    return this.jpy;
  }
}
```

```ts
class KoreaCreditCard {
  private money = 3000;

  payment(restaurant: KoreaRestaurant) {
    this.money -= restaurant.getPrice();
  }
}

class JapanCreditCard {
  private money = 3000;

  payment(restaurant: JapanRestaurant) {
    this.money -= restaurant.getPrice();
  }
}

const kr_restaurant = new KoreaRestaurant();
const kr_creditcard = new KoreaCreditCard();
kr_creditcard.payment(kr_restaurant);

const jp_restaurant = new JapanRestaurant();
const jp_creditcard = new JapanCreditCard();
jp_creditcard.payment(jp_restaurant);
```
