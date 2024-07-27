/*
 * (옵저버)[https://refactoring.guru/ko/design-patterns/observer]
 * Subject: 시간이 지나변 변경될 수 있는 중요한 상태를 가진 객체
 * */

import { html, View } from "rune-ts";

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  // 모든 등록된 옵저버들의 update 를 실행시킴
  notify(): void;
}

interface Observer {
  update(subject: Subject): void;
}

class ConcreteSubject implements Subject {
  private observers: Observer[] = [];

  constructor(public state: number) {}

  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("Subject: Observer already attached");
    }

    this.observers.push(observer);
    console.log("Subject: Attached an observer");
  }

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("Subject: Nonexistent observer");
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject: Detached an observer");
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update(this));
  }

  someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    const randomValue = Math.floor(Math.random() * 100);

    this.state = randomValue;
    console.log(`Subject: My state has just changed to: ${this.state}`);

    this.notify();
  }
}

class ConcreteObserver implements Observer {
  constructor(private _name: string) {}
  update(subject: Subject): void {
    if (subject instanceof ConcreteSubject) {
      console.log(`${this._name}: My state has changed to: ${subject.state}`);
    }
  }
}

// Usage
const subject = new ConcreteSubject(10);
const observer1 = new ConcreteObserver("observer1");
const observer2 = new ConcreteObserver("observer2");

subject.attach(observer1);
subject.attach(observer2);

console.log(
  "observer1, observer2 attached to subject, then subject's state changed.",
);
subject.someBusinessLogic();

subject.detach(observer1);
console.log("observer1 detached from subject. then subject's state changed.");
subject.someBusinessLogic();
