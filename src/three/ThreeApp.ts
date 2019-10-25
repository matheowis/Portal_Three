import { Mesh, BoxGeometry, Object3D } from 'three';
import WebGLBody from './WebGLBody';
import Ground from './components/Ground';

export function initiateThree() {
  const container = document.getElementById('canvasCointainer');
  const webGlBody = new WebGLBody({ container });

  const cubeGeo = new BoxGeometry(0.5, 0.5, 0.5);
  const cubeMesh = new Mesh(cubeGeo);
  cubeMesh.position.z = -5;
  const ground = new Ground({ size: 50 });


  webGlBody.add(cubeMesh, ground);

}
