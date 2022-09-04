import { Vector2D } from './vector';

interface DomRectReq {
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
    readonly top: number;
}

export class BoundingBox {

    constructor(private box: DomRectReq) {

    }
    width() {
        return this.box.right - this.box.left
    }
    height() {
        return this.box.bottom - this.box.top
    }
    topLeft() {
        return new Vector2D(this.box.left, this.box.top)
    }
    distance(mousePosition: Vector2D) {
        const closestX = Math.abs(mousePosition.x - this.box.left) > Math.abs(mousePosition.x - this.box.right)
            ? this.box.left
            : this.box.right
        const closestY = Math.abs(mousePosition.y - this.box.top) > Math.abs(mousePosition.y - this.box.bottom)
            ? this.box.top
            : this.box.bottom
        const closestCorner = new Vector2D(closestX, closestY)
        return mousePosition.subtract(closestCorner)

    }
}