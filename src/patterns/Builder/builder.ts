/*
 * 빌더는 복잡한 객체들을 단계별로 생성할 수 있도록 하는 생성 디자인 패턴입니다. 이 패턴을 사용하면 같은 제작 코드를 사용하여 객체의 다양한 유형들과 표현을 제작할 수 있습니다.
 * 빌더 패턴은 타입스크립트 개발자들에게 잘 알려진 패턴이며, 가능한 설정 옵션이 많은 객체를 만들어야 할 때 특히 유용합니다.
 * */

// 첫번째 예시: 조립식 컴퓨터 만들기

function ComputerBuilderExample() {
  /*
   * 컴퓨터 제품 정의
   * */
  interface IComputer {
    cpu: string;
    ram: string;
    storage: string;
    gpu?: string;
    soundCard?: string;
  }

  class Computer implements IComputer {
    cpu: string = "";
    ram: string = "";
    storage: string = "";
    gpu?: string;
    soundCard?: string;

    showSpec(): string {
      return `CPU: ${this.cpu}, RAM: ${this.ram}, Storage: ${this.storage}${this.gpu ? `, GPU: ${this.gpu}` : ""}${this.soundCard ? `, Sound Card: ${this.soundCard}` : ""}`;
    }
  }

  /*
   * 컴퓨터 빌더 정의 - 빌더는 실제로 컴퓨터를 만들어 컴퓨터 제품을 생산할 수 있어야 한다. (컴퓨터 조립 인부)
   * */
  interface IComputerBuilder {
    reset(): void;
    setCPU(cpu: string): this;
    setRAM(ram: string): this;
    setStorage(storage: string): this;
    setGPU(gpu: string): this;
    setSoundCard(soundCard: string): this;
    build(): Computer;
  }

  // 기본 Builder 클래스
  class ComputerBuilder implements IComputerBuilder {
    protected _computer: Computer = new Computer();

    reset(): this {
      this._computer = new Computer();
      return this;
    }

    setCPU(cpu: string): this {
      this._computer.cpu = cpu;
      return this;
    }

    setGPU(gpu: string): this {
      this._computer.gpu = gpu;
      return this;
    }

    setSoundCard(soundCard: string): this {
      this._computer.soundCard = soundCard;
      return this;
    }

    setRAM(ram: string): this {
      this._computer.ram = ram;
      return this;
    }

    setStorage(storage: string): this {
      this._computer.storage = storage;
      return this;
    }

    build(): Computer {
      return this._computer;
    }
  }

  // 기본 빌더를 상속받아 더 추가된 기술을 가진 Builder 로 확장
  class GamingComputerBuilder extends ComputerBuilder {
    overclockCPU(): this {
      this._computer.cpu += " (Overclocked)";
      return this;
    }

    addRGBLighting(): this {
      this._computer.soundCard += " with RGB Lighting";
      return this;
    }
  }

  // Director 클래스 정의
  class ComputerAssembler {
    private builder: ComputerBuilder | null = null;

    setBuilder(builder: ComputerBuilder): void {
      this.builder = builder;
    }

    buildStandardComputer(): Computer {
      if (this.builder == null) {
        throw new Error("No builder set");
      }

      return this.builder
        .reset()
        .setCPU("Intel i5")
        .setRAM("8GB")
        .setStorage("256GB SSD")
        .setGPU("Integrated Graphics")
        .setSoundCard("Basic Audio")
        .build();
    }

    buildGamingComputer(): Computer {
      if (this.builder == null) {
        throw new Error("No builder set");
      }

      if (this.builder instanceof GamingComputerBuilder) {
        return this.builder
          .reset()
          .setCPU("Intel i9-11900K")
          .setRAM("32GB DDR4")
          .setStorage("1TB NVMe SSD")
          .setGPU("NVIDIA RTX 3080")
          .setSoundCard("Creative Sound Blaster AE-9")
          .overclockCPU()
          .addRGBLighting()
          .build();
      } else {
        console.log(
          "Warning: Using standard builder for gaming computer. Some features may not be available.",
        );
        return this.builder
          .reset()
          .setCPU("Intel i7")
          .setRAM("16GB")
          .setStorage("512GB SSD")
          .setGPU("NVIDIA RTX 3070")
          .setSoundCard("High-quality Audio")
          .build();
      }
    }

    buildCustomComputer(config: Partial<Computer>): Computer {
      this.builder = new ComputerBuilder();

      this.builder.reset();
      if (config.cpu) this.builder.setCPU(config.cpu);
      if (config.ram) this.builder.setRAM(config.ram);
      if (config.storage) this.builder.setStorage(config.storage);
      if (config.gpu) this.builder.setGPU(config.gpu);
      if (config.soundCard) this.builder.setSoundCard(config.soundCard);
      return this.builder.build();
    }
  }

  /*
   * 클라이언트 코드
   * */

  const assembler = new ComputerAssembler();

  // 기본 컴퓨터 만들기
  assembler.setBuilder(new ComputerBuilder());
  const standardPC = assembler.buildStandardComputer();
  console.log("Standard PC:", standardPC.toString());

  // 게이밍 컴퓨터 만들기
  assembler.setBuilder(new GamingComputerBuilder());
  const gamingPC = assembler.buildGamingComputer();
  console.log("Gaming PC:", gamingPC.toString());

  // 사용자 정의 컴퓨터 만들기
  const customPC = assembler.buildCustomComputer({
    cpu: "AMD Ryzen 9 5950X",
    ram: "64GB DDR4",
    storage: "2TB NVMe SSD",
    gpu: "NVIDIA RTX 3090",
    soundCard: "High-end Audio System",
  });
  console.log("Custom PC:", customPC.toString());
}
