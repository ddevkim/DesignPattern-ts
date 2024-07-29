abstract class TransportFactory {
  abstract createTransport(): Transport;
  deliverGoods(goods: string): void {
    const transport = this.createTransport();
    transport.deliver(goods);
  }
}

class TruckTransportFactory extends TransportFactory {
  createTransport(): Transport {
    return new Truck();
  }
}

class AirplaneTransportFactory extends TransportFactory {
  createTransport(): Transport {
    return new Airplane();
  }
}

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
  const truckFactory = new TruckTransportFactory();
  const truck = truckFactory.createTransport();
  const truck2 = truckFactory.createTransport();

  const airplanFactory = new AirplaneTransportFactory();
  const airplane = airplanFactory.createTransport();
  const airplane2 = airplanFactory.createTransport();

  truck.deliver("apple");
  truck2.deliver("banana");

  airplane.deliver("cherry");
  airplane2.deliver("date");
}

(() => {
  main();
})();
