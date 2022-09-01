import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  AfterViewInit,
  ElementRef,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { hexToRGB } from '../utils/hex-to-rgb';
import { WorstCalculateTextColorPipeModule } from '../pipes';

// Inspired by https://www.youtube.com/watch?v=j7qE1nUpdTU

@Component({
  selector: 'worst-magnetic-button',
  template: `
    <button class="magnetic-container" [style.padding]="size * 0.8 + 'rem'">
      <div
        class="magnetic-element"
        [style.width]="size * 0.3 + 'rem'"
        [style.height]="size * 0.3 + 'rem'"
      >
        <img *ngIf="src" [src]="src" alt="" />
        <i
          *ngIf="icon"
          [class]="icon"
          [style.color]="color | worstCalculateTextColor"
        ></i>
      </div>
      <div
        class="magnetic-background"
        [style.width]="size * 0.6 + 'rem'"
        [style.height]="size * 0.6 + 'rem'"
        [style.border-radius]="size * 0.2 + 'rem'"
        [style.background-color]="color"
        [style.box-shadow]="boxShadow"
      ></div>
    </button>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .magnetic-container {
        border: none;
        background-color: transparent;
        position: relative;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .magnetic-element {
          z-index: 2;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            height: 100%;
            vertical-align: bottom;
          }
        }
        .magnetic-background {
          position: absolute;
          z-index: 1;
          pointer-events: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorstMagneticButtonComponent implements AfterViewInit {
  @Input() icon?: string; // mostly used for FontAwesome icons
  @Input() src?: string;
  @Input() duration = 150;
  @Input() size = 10;
  @Input() color = '#46fcb4';
  @Input() rgbAlpha = '0.85';

  public get boxShadow(): string {
    return `0px ${this.size * 0.3}rem ${
      this.size
    }rem 0px ${this.hexToRgbAString(this.color)}`;
  }
  constructor(private elementRef: ElementRef) {
    this.move = this.move.bind(this);
    this.start = this.start.bind(this);
    this.end = this.end.bind(this);
  }
  public ngAfterViewInit(): void {
    const buttons = this.elementRef.nativeElement.querySelectorAll(
      '.magnetic-container'
    );
    buttons.forEach((element: HTMLElement) => {
      element.addEventListener('mousemove', this.move);
      element.addEventListener('mouseenter', this.start);
      element.addEventListener('mouseleave', this.end);
    });
  }

  public move(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const x = event.offsetX - target.clientWidth / 2;
    const y = event.offsetY - target.clientHeight / 2;
    const { background, element } = this.getChilds(event);
    background.style.transform = `translate(${x / 6}px, ${y / 6}px)`;
    element.style.transform = `translate(${x / 4}px, ${y / 4}px)`;
  }

  public start(event: MouseEvent): void {
    this.startAnimation(event, this.duration);
    this.endAnimation(event, this.duration);
  }

  public end(event: MouseEvent): void {
    const { background, element } = this.getChilds(event);
    this.startAnimation(event, this.duration);
    background.style.transform = `translate(0px, 0px)`;
    element.style.transform = `translate(0px, 0px)`;
    this.endAnimation(event, this.duration);
  }

  private getChilds(event: MouseEvent) {
    const target = event.target as HTMLElement;
    return {
      background: target.querySelector('.magnetic-background') as HTMLElement,
      element: target.querySelector('.magnetic-element') as HTMLElement,
    };
  }

  private startAnimation(event: MouseEvent, duration: number): void {
    const { background, element } = this.getChilds(event);
    const transition = `all ${duration}ms ease`;
    background.style.transition = transition;
    element.style.transition = transition;
  }

  private endAnimation(event: MouseEvent, duration: number): void {
    const { background, element } = this.getChilds(event);
    setTimeout(() => {
      background.style.transition = '';
      element.style.transition = '';
    }, duration);
  }

  private hexToRgbAString(hex: string): string {
    const rgb = hexToRGB(hex);
    if (rgb) {
      return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${this.rgbAlpha})`;
    } else return 'transparent';
  }
}

@NgModule({
  imports: [CommonModule, WorstCalculateTextColorPipeModule],
  declarations: [WorstMagneticButtonComponent],
  exports: [WorstMagneticButtonComponent],
})
export class WorstMagneticButtonComponentModule {}
