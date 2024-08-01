/**
 * 1. 지연 초기화정도
 * 2. 단일 인스턴스를 보장할 수 없다.
 */
class Instance {
  constructor() {}
}

export default new Instance();


/**
 * import instance from '/nodemodules/v1.0.1-Instance.ts';
 * import instance from '/nodemoduels/v1.0.0-Instance.ts';
 */

