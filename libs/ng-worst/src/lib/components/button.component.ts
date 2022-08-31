import { CommonModule } from '@angular/common';
import {
  NgModule,
  ViewEncapsulation,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'worst-button',
  template: `
    <div>
      {{ btnText }}
    </div>
    `,
  styles: [
    `
    button {
        padding: 0.5rem;
        border: 1px solid #696969;
        cursor: pointer;
    }

    button:hover {
        transform: translateY(-1px);
        background: #969696;
        background: linear-gradient(90deg, #696969 0%, #969696 50%, #696969 100%);
    }

    button:active {
        translate: translateY(1px);
        background: #696969;
        background: linear-gradient(90deg, #969696 0%, #696969 50%, #969696 100%);
    }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() btnText: string = 'Click Me!';
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonComponent
  ],
  exports: [
    ButtonComponent
  ],
})
export class WorstButtonModule {}
