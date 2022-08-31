import { CommonModule } from '@angular/common';
import {
  NgModule,
  ViewEncapsulation,
  Component,
  OnInit,
  Input
} from '@angular/core';

export interface WorstColorTheme {
  main: string;
  hover: string;
  active: string;
}

@Component({
  selector: 'worst-button',
  template: `
    <button [style]="style"
            (mouseover)="setStyle(colorTheme.hover)"
            (mouseout)="setStyle(colorTheme.main)"
            (mousedown)="setStyle(colorTheme.active)"
            (mouseup)="setStyle(colorTheme.hover)">
      {{ btnText | uppercase }}
    </button>
    `,
  styles: [
    `
    button {
        border-radius: 0.75rem;
        padding: 1rem;
        border-width: 3px;
        border-style: solid;
        cursor: pointer;
        color: white;
        transition: 0.2s ease;
    }
    button:hover {
      border-radius: 1rem;
    }
    button:active {
      transform: translateY(1px);
    }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {
  @Input() btnText: string = 'Click Me!';
  @Input() colorTheme: WorstColorTheme = { main: '#61BDBA', hover: '#36817C', active: '#1E4845' };

  style!: string;

  ngOnInit() {
    this.setStyle(this.colorTheme.main);
  }

  setStyle(color: string) {
    this.style = 'border-color: ' + color + '; background: ' + color + ';';
  }
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
