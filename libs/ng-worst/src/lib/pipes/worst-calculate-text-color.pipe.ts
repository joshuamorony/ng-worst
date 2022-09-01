import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { hexToRGB } from '../utils/hex-to-rgb';

// Shout out to https://stackoverflow.com/a/11868159

@Pipe({
  name: 'worstCalculateTextColor',
})
export class WorstCalculateTextColorPipe implements PipeTransform {
  transform(hex: string): string {
    const rgb = hexToRGB(hex);
    if (rgb) {
      const brightness = Math.round(
        (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
      );
      return brightness > 125 ? '#000' : '#fff';
    } else return '#000';
  }
}

@NgModule({
  declarations: [WorstCalculateTextColorPipe],
  exports: [WorstCalculateTextColorPipe],
})
export class WorstCalculateTextColorPipeModule {}
