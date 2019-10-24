import { Object3D } from 'three';

class AnimObject3d extends Object3D {
  public animate(delta: number) {
    if (this.constructor.name === 'AnimObject3d') {
      console.error('AnimObject3d is usable only as a class extender');
    } else {
      console.error(`No overloaded animate function in ${this.constructor.name} class`);
    }
  };
}

export { AnimObject3d };