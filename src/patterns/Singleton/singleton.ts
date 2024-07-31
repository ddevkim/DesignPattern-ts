class Singleton {
  static #instance: Singleton;

  private constructor() {}

  static getInstance(): Singleton {
    if (!this.#instance) {
      this.#instance = new Singleton();
    }
    return this.#instance;
  }
}

// client
const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();

console.log(s1 === s2);
