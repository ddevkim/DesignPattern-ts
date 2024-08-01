import { Node, Offset, Rect } from './share'

// class Center extends Node {
//   constructor(private child: Node) {
//     super();
//     this.addChild(child)
//   }

//   draw(ctx: CanvasRenderingContext2D, offset: Offset): void {
//     const parent = this.parent!
//     let parentWidth = parent.width
//     let parentHeight = parent.height

//     const childWidth = this.child.width
//     const childHeight = this.child.height

//     this.child.x = (parentWidth - childWidth) / 2
//     this.child.y = (parentHeight - childHeight) / 2

//     this.child.draw(ctx, offset);
//   }
// }

//  const a= new Center(new Rect({ width: 100, height: 100, color: 'red' }))

//  a.draw(ctx, { x: 0, y: 0 })