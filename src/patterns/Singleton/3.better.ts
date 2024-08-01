/**
 * ref와 unref 없이 가비지 컬렉션이 가능한 예시
 */
class Singleton {
  private static get instanceWeakRef(): WeakRef<Singleton> | null {
    return this.getGlobalObject().singletonInstanceWeakRef || null;
  }

  private static set instanceWeakRef(value: WeakRef<Singleton> | null) {
    this.getGlobalObject().singletonInstanceWeakRef = value;
  }

  private static get finalizationRegistry(): FinalizationRegistry<string> {
    if (!this.getGlobalObject().singletonFinalizationRegistry) {
      this.getGlobalObject().singletonFinalizationRegistry = new FinalizationRegistry((heldValue: string) => {
        console.log('Singleton instance has been garbage collected');
        this.instanceWeakRef = null;
      });
    }
    return this.getGlobalObject().singletonFinalizationRegistry;
  }

  private constructor() {
    // private 생성자
  }

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
    let instance = this.instanceWeakRef?.deref();
    
    if (!instance) {
      instance = new Singleton();
      this.instanceWeakRef = new WeakRef(instance);
      this.finalizationRegistry.register(instance, "Singleton instance");
      globalObject.singletonInstance = instance;
    }
    
    return instance;
  }
}

// 사용 예시
const instance1 = Singleton.getInstance();
instance1.someMethod(); // 'Singleton method called'

const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
