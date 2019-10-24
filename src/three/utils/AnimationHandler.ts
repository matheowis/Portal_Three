import { AnimObject3d } from './AnimObject3d';

interface IAnimationMap {
  [prop: string]: AnimObject3d
}

class AnimationHandler {
  private animationMap: IAnimationMap
  private children: Array<AnimObject3d>


  public getChildren = () => this.children;

  public add = (...object3d: Array<AnimObject3d>) => {
    this.children.splice(0, this.children.length);
    for (var i = 0; i < object3d.length; i++) {
      this.animationMap[object3d[i].uuid] = object3d[i];
    }
    const locObjects = Object.keys(this.animationMap).map(key => this.animationMap[key]);
    Object.assign(this.children, locObjects);
  }

  public remove = (...object3d: Array<AnimObject3d>) => {
    this.children.splice(0, this.children.length);
    for (var i = 0; i < object3d.length; i++) {
      delete this.animationMap[object3d[i].uuid];
    }
    const locObjects = Object.keys(this.animationMap).map(key => this.animationMap[key]);
    Object.assign(this.children, locObjects);
  }

  public animate = (delta: number) => {
    // console.log('This',this)
    this.children.forEach((animObject) => {
      animObject.animate(delta);
    })
  }

  constructor(){
    this.animationMap = {};
    this.children = [];
  }
}

export default AnimationHandler