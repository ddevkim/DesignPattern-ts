interface GuiFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

interface Button {
  click(): void;
}

interface Checkbox {
  check(): void;
}

class WinButton implements Button {
  click() {
    console.log("window button is clicked");
  }
}

class MacButton implements Button {
  click() {
    console.log("mac button is clicked");
  }
}

class WinCheckbox implements Checkbox {
  check() {
    console.log("window checkbox is checked");
  }
}

class MacCheckBox implements Checkbox {
  check() {
    console.log("mac checkbox is checked");
  }
}

class WinFactory implements GuiFactory {
  createButton() {
    return new WinButton();
  }
  createCheckbox() {
    return new WinCheckbox();
  }
}

class MacFactory implements MacFactory {
  createButton() {
    return new MacButton();
  }
  createCheckbox() {
    return new MacCheckBox();
  }
}

// client code

// application 은 OS 를 신경쓰지 않아도 된다. factory 가 알아서 생성자를 잘 선택해서 만들어 줄 것이다.
class Application {
  constructor(private _factory: GuiFactory) {}

  createButton() {
    this._factory.createButton();
  }

  createCheckbox() {
    this._factory.createCheckbox();
  }
}
