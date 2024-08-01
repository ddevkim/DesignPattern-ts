class Singleton {
  private static refCount: number = 0;

  private constructor() {}

  public someMethod(): void {
    console.log('Singleton method called');
  }

  private static getGlobalObject(): any {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof self !== 'undefined') return self;
    if (typeof window !== 'undefined') return window;
    throw new Error('Unable to locate global object');
  }

  public static getInstance(): Singleton {
    const globalObject = this.getGlobalObject();
    if (!globalObject.singletonInstance) {
      globalObject.singletonInstance = new Singleton();
    }
    this.refCount++;
    return globalObject.singletonInstance;
  }

  public static ref(): void {
    this.refCount++;
  }

  public static unref(): void {
    this.refCount--;
    if (this.refCount === 0) {
      const globalObject = this.getGlobalObject();
      delete globalObject.singletonInstance;
    }
  }
}

// 사용 예시
const instance1 = Singleton.getInstance();
Singleton.ref();
// ... 인스턴스 사용 ...
instance1.someMethod(); // 'Singleton method called'
Singleton.unref();

const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true