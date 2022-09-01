/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
  NgModule,
  ViewEncapsulation,
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'worst-input',
  template: `
    <div class="worst-input-box">
      <label [ngClass]="focused ? 'label-focused' : ''">{{ label }}</label>
      <input [(ngModel)]="value" [type]="type" (focus)="focused = true" (blur)="onBlur($event)" />
    </div>
  `,
  styles: [
    `
      .worst-input-box {
        position: relative;
        margin-bottom: 20px;
        padding-bottom: 20px;

        label {
          position: relative;
          left: 1rem;
          top: 1rem;
          padding: 0 0.25rem;
          color: #939fab;
          font-size: 1rem;
          transition: 0.3s;
        }

        input {
          position: absolute;
          top: 0;
          left: 0;
          border: 1px solid #d9d9d9;
          border-radius: 5px;
          outline: none;
          padding: 15px;
          background: none;
          z-index: 1;
          color: #171c25;
          transition: 0.5s;
        }

        input:focus {
          border-color: #40a9ff;
          text-transform: lowercase;
        }

        .label-focused {
          top: -0.6rem;
          left: 0.8rem;
          background-color: white;
          color: #40a9ff;
          z-index: 10;
          text-transform: lowercase;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: WorstInputComponent,
      multi: true,
    },
  ],
})
export class WorstInputComponent {
  @Input() label = 'Worst Input';
  @Input() type: InputType = 'text';

  focused!: boolean;
  field: string | number | null = null;

  set value(val: string | number | null) {
    this.field = val;
    this.onChange(val);
    this.onTouch(val);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(onTouched: any) {
    this.onTouch = onTouched;
  }

  onChange: any = () => {
    //
  };
  onTouch: any = () => {
    //
  };

  onBlur = (e: any) => {
    const value = e.target.value;
    if (!value) {
      this.focused = false;
    }
  };
}

export type InputType = 'text' | 'password' | 'number';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [WorstInputComponent],
  exports: [WorstInputComponent],
})
export class WorstInputModule {}
