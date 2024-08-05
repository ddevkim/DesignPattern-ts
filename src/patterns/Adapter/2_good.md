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

class RestaurantAdapter extends KoreaRestaurant {
  private restaurant: JapanRestaurant;

  constructor(restaurant: JapanRestaurant) {
    super();
    this.restaurant = restaurant;
  }

  getPrice() {
    return this.restaurant.getPrice() * 1.1;
  }
}

const kr_restaurant = new KoreaRestaurant();
const kr_creditcard = new KoreaCreditCard();
kr_creditcard.payment(kr_restaurant);

const jp_restaurant = new JapanRestaurant();
kr_creditcard.payment(jp_restaurant); // X

const jp_adapter = new RestaurantAdapter(jp_restaurant);
kr_creditcard.payment(jp_adapter); // O
```
