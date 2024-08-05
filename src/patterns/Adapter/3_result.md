## 함정

Q. 어댑터 패턴과 같이 변환기를 만들어 주면 되니까 데이터를 추상화시키지 않아도 괜찮겠는 걸?

```ts
class KoreaRestaurant {
  private krw;

  getPrice() {
    return krw;
  }
}

class JapanRestuarant {
  private jpy;

  getPrice() {
    return jpy;
  }
}
```

결국 같은 기능을 한다면 불필요하다.

```ts
class Restuarnat {
  private price;

  getPrice() {
    return price;
  }
}
// (혹은 interface)
```

## 결론

변환이 필요한 대상을 수정 할 수 없을때 유용하다.

고정된 타사의 라이브러리, 형식 등.

어댑터 패턴은 결국, 우리가 의도한 대로 가공할 수 없는 경우 중간 변환기를 새로 만드는 일이기 때문
