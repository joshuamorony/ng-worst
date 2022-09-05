import { Component, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { BoundingBox } from '../utils/bounding-rect';
import { Vector2D } from '../utils/vector';


/**
 * button that doenst want to be clicked 
 * (for best results place somewhere in the middle of a page)
 */
@Directive({
    selector: "[worstAntiMagneticElement]"
})
export class AntiMagneticElementDirective {


    @Input()
    distance = 200

    private placeholderElement?: HTMLDivElement

    constructor(private elementRef: ElementRef<HTMLButtonElement>) {

    }


    currentBox(): BoundingBox {
        return new BoundingBox(this.elementRef.nativeElement.getBoundingClientRect())
    }


    placeholder() {
        if (this.placeholderElement === undefined) {
            this.placeholderElement = this.elementRef.nativeElement.cloneNode(true) as HTMLDivElement
            this.placeholderElement.style.opacity = "0"
            this.elementRef.nativeElement.parentElement?.insertBefore(this.placeholderElement, this.elementRef.nativeElement)
        }
    }

    @HostListener("window:mousemove", ["$event"])
    mouseMoved(e: MouseEvent) {
        const mousePosition = new Vector2D(e);
        const currentBox = this.currentBox()
        const distanceToMouse = currentBox.distance(mousePosition)

        if (distanceToMouse.length < this.distance) {
            const desiredDistanceVector = distanceToMouse.scaleTo(this.distance)
            const offsetVector = distanceToMouse.subtract(desiredDistanceVector)
            const desiredPos = currentBox.topLeft().add(offsetVector)

            if (desiredPos.x < 0 || desiredPos.x > innerWidth || desiredPos.y < 0 || desiredPos.y > innerHeight) {
                this.reset()
            } else {
                this.placeholder()
                desiredPos.apply(this.elementRef.nativeElement)
            }


        }

    }


    reset() {
        this.elementRef.nativeElement.style.position = "relative"
        this.elementRef.nativeElement.style.left = "0"
        this.elementRef.nativeElement.style.top = "0"

        this.placeholderElement?.remove()
        this.placeholderElement = undefined
    }
}