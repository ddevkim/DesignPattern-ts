import { Offset, Rect, type RectProps } from "./share";

// 기존 Rect 클래스에 테두리 추가
class BorderedRect extends Rect {
  borderColor: string;
  borderWidth: number;

  constructor(props: RectProps & { borderColor: string; borderWidth: number }) {
    super(props);
    this.borderColor = props.borderColor;
    this.borderWidth = props.borderWidth;
  }

  override draw(ctx: CanvasRenderingContext2D, offset: Offset): void {
    super.draw(ctx, offset);
    /**
     * 테두리 그리기
     */

    // Utils.drawBorder(ctx, offset)

    // const x = this.x + offset.x;
    // const y = this.y + offset.y;
    // ctx.strokeStyle = this.borderColor;
    // ctx.lineWidth = this.borderWidth;
    // ctx.strokeRect(x, y, this.width, this.height);
  }
}

// Rect 클래스에 그림자 추가
class ShadowedRect extends Rect {
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;

  constructor(props: RectProps & { 
    shadowColor: string; 
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
  }) {
    super(props);
    this.shadowColor = props.shadowColor;
    this.shadowBlur = props.shadowBlur;
    this.shadowOffsetX = props.shadowOffsetX;
    this.shadowOffsetY = props.shadowOffsetY;
  }

  override draw(ctx: CanvasRenderingContext2D, offset: Offset): void {
    ctx.save();
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowOffsetX = this.shadowOffsetX;
    ctx.shadowOffsetY = this.shadowOffsetY;
    super.draw(ctx, offset);
    ctx.restore();
  }
}

// 테두리와 그림자를 모두 가진 Rect
class BorderedShadowedRect extends BorderedRect {
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;

  constructor(props: RectProps & { 
    borderColor: string; 
    borderWidth: number;
    shadowColor: string; 
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
  }) {
    super(props);
    this.shadowColor = props.shadowColor;
    this.shadowBlur = props.shadowBlur;
    this.shadowOffsetX = props.shadowOffsetX;
    this.shadowOffsetY = props.shadowOffsetY;
  }

  override draw(ctx: CanvasRenderingContext2D, offset: Offset): void {
    ctx.save();
    /**
     * 테두리 그리기
     */
    const x = this.x + offset.x;
    const y = this.y + offset.y;
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = this.borderWidth;
    ctx.strokeRect(x, y, this.width, this.height);

    /**
     * 그림자 그리기
     */
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowOffsetX = this.shadowOffsetX;
    ctx.shadowOffsetY = this.shadowOffsetY;
    super.draw(ctx, offset);
    ctx.restore();
  }
}

// 사용 예시
const borderedRect = new BorderedRect({
  x: 10, y: 10, width: 100, height: 50, color: 'red',
  borderColor: 'black', borderWidth: 2
});

const shadowedRect = new ShadowedRect({
  x: 120, y: 10, width: 100, height: 50, color: 'blue',
  shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 5,
  shadowOffsetX: 3, shadowOffsetY: 3
});

const borderedShadowedRect = new BorderedShadowedRect({
  x: 230, y: 10, width: 100, height: 50, color: 'green',
  borderColor: 'black', borderWidth: 2,
  shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 5,
  shadowOffsetX: 3, shadowOffsetY: 3
});

// 렌더링 예시
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
if (ctx) {

  borderedRect.draw(ctx, { x: 0, y: 0 });
  shadowedRect.draw(ctx, { x: 0, y: 0 });
  borderedShadowedRect.draw(ctx, { x: 0, y: 0 });
}