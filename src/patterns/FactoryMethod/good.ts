/*
 * 교통수단에 interface 를 만들어 줌으로써 신규 교통 수단이 들어와도 동일한 method 호출이 가능하게 하자.
 * */

interface Transport {
  name: string;
  deliver(goods: string): void;
}

class Truck implements Transport {
  name = "truck";
  deliver(goods: string): void {
    console.log(`Truck is delivering goods ${goods}.`);
  }
}

class Airplane implements Transport {
  name = "airplane";
  deliver(goods: string): void {
    console.log(`Airplane is delivering ${goods}`);
  }
}

function deliverGoods(transportation: Transport, goods: string) {
  transportation.deliver(goods);
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
 * -
 * */
