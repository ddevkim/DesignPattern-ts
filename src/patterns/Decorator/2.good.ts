import { Node, type Offset, Rect } from "./share";

// 노드 데코레이터 추상 클래스
abstract class NodeDecorator extends Node {
  protected child: Node;

  constructor(child: Node) {
    super();
    this.addChild(child);
    this.child = child;
  }

  get x(): number { return this.child.x; }
  get y(): number { return this.child.y; }
  get width(): number { return this.child.width; }
  get height(): number { return this.child.height; }
}

// 테두리 데코레이터
class BorderDecorator extends NodeDecorator {
  borderColor: string;
  borderWidth: number;

  constructor({ child, borderColor, borderWidth }: { child: Node, borderColor: string, borderWidth: number }) {
    super(child);
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
  }

  override draw(ctx: CanvasRenderingContext2D, offset: Offset): void {
    this.child.draw(ctx, offset);
    
    const x = offset.x + this.x
    const y = offset.y + this.y

    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = this.borderWidth;
    ctx.strokeRect(x, y, this.width, this.height);
  }
}

// 그림자 데코레이터
class ShadowDecorator extends NodeDecorator {
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;

  constructor({ child, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY }: { child: Node, shadowColor: string, shadowBlur: number, shadowOffsetX: number, shadowOffsetY: number }) {
    super(child);
    this.shadowColor = shadowColor;
    this.shadowBlur = shadowBlur;
    this.shadowOffsetX = shadowOffsetX;
    this.shadowOffsetY = shadowOffsetY;
  }

  override draw(ctx: CanvasRenderingContext2D, offset: Offset): void {
    ctx.save();
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowOffsetX = this.shadowOffsetX;
    ctx.shadowOffsetY = this.shadowOffsetY;
    this.child.draw(ctx, offset);
    ctx.restore();
  }
}

// 사용 예시
const baseRect = new Rect({ x: 10, y: 10, width: 100, height: 50, color: 'red' });

const borderedRect = new BorderDecorator({ child: baseRect, borderColor: 'black', borderWidth: 2 });

const shadowedRect = new ShadowDecorator({
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowBlur: 5,
  shadowOffsetX: 3,
  shadowOffsetY: 3,
  child: new Rect({ x: 120, y: 10, width: 100, height: 50, color: 'blue' }),
});

const borderedShadowedRect = new BorderDecorator(
  {
    child: new ShadowDecorator({
      child: new Rect({ x: 230, y: 10, width: 100, height: 50, color: 'green' }),
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowBlur: 5,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
    }),
    borderColor: 'black',
    borderWidth: 2,
  }
);

// 렌더링 예시
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
if (ctx) {
  borderedRect.draw(ctx, { x: 0, y: 0 });
  shadowedRect.draw(ctx, { x: 0, y: 0 });
  borderedShadowedRect.draw(ctx, { x: 0, y: 0 });
}