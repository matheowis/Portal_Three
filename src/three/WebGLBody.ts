import { WebGLRenderer, PerspectiveCamera, Scene, Object3D } from 'three';
import OrbitControls, { OribtControlsType } from './examples/OrbitControls';
import AnimationHandler from './utils/AnimationHandler';
import { AnimObject3d } from './utils/AnimObject3d';
import Character from './components/Character';
import { APP_OPTIONS } from './store/options';

interface IWebGL_Body {
  antialias?: boolean,
  fullScreen?: boolean,
  alpha?: boolean
  // FOV?: number,
  // cameraDistance?: number,
  container: HTMLElement,
}

const defaultProps: IWebGL_Body = {
  // FOV: 60,
  antialias: true,
  fullScreen: false,
  alpha: false,
  // cameraDistance: 10,
  container: null,
}

class WebGLBody {
  constructor(props: IWebGL_Body = defaultProps) {
    const { antialias, container, alpha } = { ...defaultProps, ...props };
    this.renderer = new WebGLRenderer({ antialias, alpha });
    this.container = container;
    this.scene = new Scene();
    this.setOptions();
    // this.camera = new PerspectiveCamera(FOV, this.container.clientWidth / this.container.clientHeight, 0.1, 2000);

    this.container.append(this.renderer.domElement);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.camera.position.z = -cameraDistance;

    window.addEventListener('resize', this.resize);

    this.character = new Character();
    this.add(this.character);
    this.render();
  }

  private animationId: number;
  private animationHandler = new AnimationHandler();
  private setOptions = () => {
    APP_OPTIONS.aspect = this.container.clientWidth / this.container.clientHeight;

  }
  private resize = () => {
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

    this.character.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.character.camera.updateProjectionMatrix();
  }
  private render = () => {
    requestAnimationFrame(this.render);
    this.animationHandler.animate(1);
    // this.controls.update();
    this.renderer.render(this.scene, this.character.camera);
  }

  public container: HTMLElement;
  public renderer: WebGLRenderer;
  public scene: Scene;
  public camera: PerspectiveCamera;
  public controls: OribtControlsType;
  public character: Character;

  public add(...object: Array<Object3D>) {
    object.forEach(obj => {
      if (obj instanceof AnimObject3d) {
        this.animationHandler.add(obj);
      }
    })
    this.scene.add(...object);
  }
  public addCharacter(character: Character) {
    this.scene.add(character);
    this.character = character;
  }
  public remove(...object: Array<Object3D>) {
    object.forEach(obj => {
      if (obj instanceof AnimObject3d) {
        this.animationHandler.remove(obj);
      }
    })
    this.scene.remove(...object)
  }
  public destroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resize);
  }
}

export default WebGLBody;
