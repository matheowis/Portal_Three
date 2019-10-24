export function lerp(a: number, b: number, alpha: number): number {
  return a + (b - a) * alpha
}
export function clamp(value: number, min: number, max: number): number {
  return value > max ? max : value < min ? min : value;
}
