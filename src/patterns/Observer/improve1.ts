// 이번에는 이벤트를 관리하는 이벤트 관리자를 독립적으로 구현
// EventListener

interface EventListener {
  whenTriggerCb(data: unknown): void;
}

interface EventManager {
  subscribe(eventType: string, eventListener: EventListener): void;

  unsubscribe(eventType: string, eventListener: EventListener): void;

  notify(eventType: string, data: unknown): void;
}

class EventManager implements EventManager {
  private _listeners: Map<string, EventListener[]> = new Map();

  // 하나의 eventType 에 여러 eventListener 등록 가능 구조
  subscribe(eventType: string, eventListener: EventListener) {
    const existListeners = this.getEventListenersByEventType(eventType);
    if (existListeners) {
      existListeners.push(eventListener);
    } else {
      this._listeners.set(eventType, [eventListener]);
    }
  }

  unsubscribe(eventType: string, eventListener: EventListener) {
    const existListeners = this.getEventListenersByEventType(eventType);
    if (existListeners) {
      const index = existListeners.indexOf(eventListener);
      if (index > -1) {
        existListeners.splice(index, 1);
      }
    }
  }

  // eventType 에 등록되어 있는 모든 eventListener 에 정의된 whenTriggerCb 를 호출
  notify(eventType: string, data: unknown) {
    const existListeners = this.getEventListenersByEventType(eventType);
    if (existListeners) {
      existListeners.forEach((listener) => listener.whenTriggerCb(data));
    }
  }

  getEventListenersByEventType(eventType: string): EventListener[] | undefined {
    return this._listeners.get(eventType);
  }
}

// Usage

// Publisher
class Counter {
  count = 0;

  eventManager: EventManager;

  constructor() {
    this.eventManager = new EventManager();
  }

  increment() {
    this.count++;
    this.eventManager.notify("counter_incremented", this.count);
  }

  decrement() {
    this.count--;
    this.eventManager.notify("counter_decremented", this.count);
  }
}

// EventListener
class SlackMessageEventListener implements EventListener {
  whenTriggerCb(data: unknown) {
    console.log(`Slack: Counter value has changed to ${JSON.stringify(data)}`);
  }
}

function main() {
  const counter = new Counter();
  const slackMessageEventListener = new SlackMessageEventListener();

  counter.eventManager.subscribe(
    "counter_incremented",
    slackMessageEventListener,
  );
  counter.eventManager.subscribe(
    "counter_decremented",
    slackMessageEventListener,
  );

  counter.increment();
  counter.increment();
  counter.decrement();
}

main();
