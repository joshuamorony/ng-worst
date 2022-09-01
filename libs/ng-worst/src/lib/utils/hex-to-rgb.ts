/* eslint-disable @typescript-eslint/no-explicit-any */

// Shout out to https://stackoverflow.com/a/21648508

export function hexToRGB(hex: string): number[] | null {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = ('0x' + c.join('')) as any;
    const r = (c >> 16) & 255;
    const g = (c >> 8) & 255;
    const b = c & 255;
    return [r, g, b];
  }
  return null;
}
