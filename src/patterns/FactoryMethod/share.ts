interface Transportation {
  deliver(goods: string): void;
}

class Truck implements Transportation {
  name = "truck";
  deliver(goods: string) {
    console.log(`Truck is delivering ${goods}.`);
  }
}

class Airplane implements Transportation {
  name = "airplane";
  deliver(goods: string) {
    console.log(`Airplane is delivering ${goods}.`);
  }
}

class Train implements Transportation {
  name = "train";
  deliver(goods: string) {
    console.log(`Train is delivering ${goods}.`);
  }
}

function deliverGoods(transportation: Transportation, goods: string) {
  transportation.deliver(goods);
}

type TransportationType = "airplane" | "truck" | "train";

class Factory {
  availableTransportations: Map<TransportationType, Transportation> = new Map();
  register(type: TransportationType, transport: Transportation) {
    this.availableTransportations.set(type, transport);
  }

  createTransport(type: TransportationType): Transportation {
    switch (type) {
      case "airplane":
        return new Airplane();
      case "truck":
        return new Truck();
      case "train":
        return new Train();
      default:
        throw new Error("Unsupported transportation type");
    }
  }
}

/*
 * 팩토리 패턴
 * - 프로덕트 인스턴스를 직접 생성해서 사용하면 인스턴스 생성부마다 모두 변경 필요.
 *   - IDE 가 많은 도움을 주기는 하지만 변경점이 많이 생기면 좋지 않다.
 *   - 변경점이 해당 파일 내에 충돌이 발생할 가능성. 스코프를 줄일 응집성이 유지된 객체가 필요하다.
 * - 팩토리로 감싸서 인스턴스를 생성해 주면 프로덕트의 변경이 필요할 시 팩토리 내부의 인스턴스 생성부만 한번 변경하면 됨.
 * - 외부에서 추가하려는 인스턴스를 동적으로 런타임에 주입할 수 있는 register 를 제공해 주면 더 나음.
 * - Factory 가 변수를 받아서 알아서 인스턴스를 동적으로 생성시켜주는 예시도 훌륭함.
 * */

function main1() {
  const factory = new Factory();
  const truck = factory.createTransport("truck");
  const airplane = factory.createTransport("airplane");
  const train = factory.createTransport("train");

  deliverGoods(truck, "apple");
  deliverGoods(airplane, "grapefruit");
  deliverGoods(train, "human");
}

function main2() {
  const airplane = new Airplane();
  deliverGoods(airplane, "grapefruit");
}

(() => {
  main1();
  main2();
})();

abstract class TrFactory {
  abstract createTransport(): Transportation;

  deliverGoods(goods: string): void {
    const transport = this.createTransport();
    transport.deliver(goods);
  }
}

class AirplaneFactory {
  createTransport(): Transportation {
    return new Airplane();
  }
}

class TrainFactory {
  createTransport(): Transportation {
    return new Train();
  }
}
