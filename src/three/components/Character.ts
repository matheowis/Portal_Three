import { PerspectiveCamera, Vector3 } from 'three';
import { AnimObject3d } from '../utils/AnimObject3d';
import { APP_OPTIONS } from '../store/options';

class Character extends AnimObject3d {
  private forceDirection = new Vector3()
  private createCamera = () => {
    const { aspect, near, far } = APP_OPTIONS;
    this.camera = new PerspectiveCamera(60, aspect, near, far);
    this.camera.position.y = 1.75;
    this.add(this.camera);
  }
  private setControls = () => {
    window.addEventListener('keydown', this.startMovement);
    window.addEventListener('keyup', this.stopMovement);
  }
  private startMovement = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'A':
        this.forceDirection.x = -1;
        break;
      case 'D':
        this.forceDirection.x = 1;
        break;
      case 'W':
        this.forceDirection.z = 1;
        break;
      case 'S':
        this.forceDirection.z = -1;
        break;
    }
    this.forceDirection.normalize();
  }
  private stopMovement = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'A':
        this.forceDirection.x = 0;
        break;
      case 'D':
        this.forceDirection.x = 0;
        break;
      case 'W':
        this.forceDirection.z = 0;
        break;
      case 'S':
        this.forceDirection.z = 0;
        break;
    }
    this.forceDirection.normalize();
  }


  public camera: PerspectiveCamera;
  public velocity = new Vector3();
  public speed = 1;
  /**
   * Animate
   */
  public animate(delta: number) {
    this.velocity.copy(this.forceDirection)
      .multiplyScalar(this.speed * delta)
      .applyEuler(this.rotation);
    this.position.add(this.velocity);
  }

  constructor() {
    super();
    this.createCamera();
    this.setControls();
    // this.uuid
  }
}

export default Character