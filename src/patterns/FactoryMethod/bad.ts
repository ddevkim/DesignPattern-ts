/*
 * 팩토리 메서드는 부모 클래스에서 객체들을 생성할 수 있는 인터페이스를 제공하지만,
 * 자식 클래스들이 생성될 객체들의 유형을 변경할 수 있도록 하는 생성 패턴입니다.
 * */

/*
 * 안좋은 예
 * - 초기에 truck 존재하였다. (ship method 를 가지고 있음)
 * - 추후 다른 교통수단인 airplane 이 추가되었고 이는 cargo method 를 가진다.
 * - 배송을 담당하는 곳에서 교통수단에 따라 분기 로직이 추가되게 된다.
 * */
class Truck {
  name = "truck";
  ship(goods: string) {
    console.log(`Truck is delivering goods ${goods}.`);
  }
}

function deliverGoods(transportation: Truck | Airplane, goods: string) {
  if (transportation instanceof Truck) {
    transportation.ship(goods);
  } else if (transportation instanceof Airplane) {
    transportation.cargo(goods);
  } else {
    throw new Error("Unsupported transportation type");
  }
}

// 비행기로 물류 기획이 추가됨.
class Airplane {
  name = "airplane";
  cargo(goods: string) {
    console.log(`Airplane is delivering ${goods}`);
  }
}

function main() {
  const truck = new Truck();
  const airplane = new Airplane();

  deliverGoods(truck, "apple");
  deliverGoods(airplane, "grapefruit");
}

(() => {
  main();
})();

/*
 * 아쉬운 점
 * - 개별 교통 수단들의 배송 method interface 가 없어서 배송을 호출하는 code 에서 교통 수단 별 분기 로직이 필요해 짐.
 * - 만약 truck 의 delivery method 가 변경되는 경우 truck 이 사용되는 모든 곳을 고쳐야 함.
 *
 * 개선 방향
 * - 교통 수단들에 통일화된 interface 를 만들자
 * */
