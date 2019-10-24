import { Mesh, BoxGeometry, Object3D } from 'three';
import WebGLBody from './WebGLBody';
import Character from './components/Character';

export function initiateThree() {
  const container = document.getElementById('canvasCointainer');
  const webGlBody = new WebGLBody({ container });

  const cubeGeo = new BoxGeometry(0.5, 0.5, 0.5);
  const cubeMesh = new Mesh(cubeGeo);
  const character = new Character();

  webGlBody.add(cubeMesh, character);

}
