interface VectorLike {
    x: number,
    y: number
}

export class Vector2D {
    x: number;

    y: number

    constructor(x: number | VectorLike, y?: number) {
        if (typeof x == "object") {
            this.y = x.y;
            this.x = x.x;
        } else {
            this.x = x
            this.y = y ?? 0
        }

    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    subtract(other: Vector2D) {
        return new Vector2D(other.x - this.x, other.y - this.y)
    }
    add(other: Vector2D) {
        return new Vector2D(other.x + this.x, other.y + this.y)
    }
    dividedBy(scalar: number) {
        return new Vector2D(this.x / scalar, this.y / scalar)
    }
    multipliedBy(scalar: number) {
        return new Vector2D(this.x * scalar, this.y * scalar)
    }
    scaleTo(distance: number) {
        return this.unitVector().multipliedBy(distance)
    }

    unitVector() {
        return this.dividedBy(this.length)
    }

    invert() {
        return this.multipliedBy(-1)
    }

    apply(nativeElement: HTMLButtonElement) {
        nativeElement.style.position = "fixed";
        nativeElement.style.left = this.x + "px"
        nativeElement.style.top = this.y + "px"
    }
}