interface Publisher {
  name: string;
  addSubscriber(subscriber: Subscriber): void;
  removeSubscriber(subscriber: Subscriber): void;
  notifyToSubscribers(): void;
  getState: () => unknown;
}

interface Subscriber {
  name: string;
  update(publisher: Publisher): void;
}

abstract class ConcretePublisher<T> implements Publisher {
  private _subscribers: Subscriber[] = [];
  private _state: T;

  constructor(
    public name: string,
    initialState: T,
  ) {
    this._state = initialState;
  }

  addSubscriber(subscriber: Subscriber): void {
    const idx = this._getSubscriberIndex(subscriber);
    if (idx !== -1) {
      console.log(`Publisher: ${subscriber.name} already exists`);
    } else {
      this._subscribers.push(subscriber);
      console.log(`Publisher: ${subscriber.name} Subscribed successfully`);
    }
  }
  removeSubscriber(subscriber: Subscriber): void {
    const idx = this._getSubscriberIndex(subscriber);

    if (idx === -1) {
      console.log(`Publisher: ${subscriber.name} does not exist`);
    } else {
      this._subscribers.splice(idx, 1);
      console.log(`Publisher: ${subscriber.name} Unsubscribed successfully`);
    }
  }

  notifyToSubscribers(): void {
    this._subscribers.forEach((subscriber) => {
      subscriber.update(this);
    });
  }

  getState() {
    return this._state;
  }

  setState(newState: T) {
    this._state = newState;
  }

  abstract businessLogic(data: unknown): void;

  private _getSubscriberIndex(subscriber: Subscriber): number {
    return this._subscribers.indexOf(subscriber);
  }
}

class ConcreteSubscriber implements Subscriber {
  constructor(public name: string) {}

  update(publisher: Publisher) {
    console.log(
      `${this.name}: I've received notification from ${publisher.name}. Publisher's state is changed to ${JSON.stringify(publisher.getState())}`,
    );
  }
}

type CountState = {
  count: number;
};

class Counter extends ConcretePublisher<CountState> {
  override businessLogic(): void {
    const randomValue = Math.floor(Math.random() * 100);
    this.setState({ count: randomValue });
    console.log(
      `Publisher: My state has just changed to: ${JSON.stringify(this.getState())}`,
    );
    this.getState();
    this.notifyToSubscribers();
  }
}

class NameBook extends ConcretePublisher<{ name: string }> {
  override businessLogic(): void {
    const newName = Math.random().toString(36).substring(2, 7);
    this.setState({ name: newName });
    console.log(
      `Publisher: My state has just changed to: ${JSON.stringify(this.getState())}`,
    );
    this.getState();
    this.notifyToSubscribers();
  }
}

function main() {
  const publisher = new Counter("Publisher 1", { count: 0 });
  const publisherNameBook = new NameBook("Publisher 2", { name: "jamie" });
  const subscriber1 = new ConcreteSubscriber("Subscriber 1");
  const subscriber2 = new ConcreteSubscriber("Subscriber 2");

  publisher.addSubscriber(subscriber1);
  publisherNameBook.addSubscriber(subscriber1);

  publisher.businessLogic();
  publisherNameBook.businessLogic();

  publisher.removeSubscriber(subscriber1);

  publisher.businessLogic();
  publisherNameBook.addSubscriber(subscriber2);
}

main();
