export type Offset = {
  x: number;
  y: number;
}

export abstract class Node {
  parent: Node | null = null;
  children: Node[] = [];

  abstract get x(): number;
  abstract get y(): number;
  abstract get width(): number;
  abstract get height(): number;

  addChild(child: Node): void {
    this.children.push(child);
    child.parent = this;
  }

  removeChild(child: Node): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }
  }

  abstract draw(ctx: CanvasRenderingContext2D, offset: Offset): void;
}

export type RectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export class Rect extends Node {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;
  color: string;

  constructor({ x, y, width, height, color }: RectProps) {
    super();
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.color = color;
  }

  get x(): number { return this._x; }
  get y(): number { return this._y; }
  get width(): number { return this._width; }
  get height(): number { return this._height; }

  override draw(ctx: CanvasRenderingContext2D, offset: Offset): void {
    const x = offset.x + this.x
    const y = offset.y + this.y
    ctx.fillRect(x, y, this.width, this.height);

    this.children.forEach(child => child.draw(ctx, { x, y }));
  }
}
