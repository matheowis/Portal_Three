import { Mesh, BufferGeometry, Vector2, Vector3, BufferAttribute } from 'three';
import { lerp } from '../utils/calc';

interface ILegoPieceMesh {
  size: Vector2;
  piviot: Vector3;
}

const defaultProps = {
  size: new Vector2(1, 1),
  piviot: new Vector3(0.5, 0.5, 0.5),
}


class LegoPieceMesh extends Mesh {
  constructor(props: ILegoPieceMesh = defaultProps) {
    super();
    const { piviot, size } = { ...defaultProps, ...props };
    this.piviot = piviot;
    this.size = size;

    const positionTypedArray = new Float32Array(this.getBaseVertices());
    const normalTypedArray = new Float32Array(this.getBaseNormals());
    const indexTypeArray = new Uint8Array([
      0, 1, 2,
      0, 2, 3,
      4, 5, 6,
      4, 6, 7,
      8, 9, 10,
      8, 10, 11
    ]);

    this.createWall(new Vector3(0, 0, -1), new Vector2(0, 0));

    this.geometry = new BufferGeometry();
    this.geometry.attributes.position = new BufferAttribute(positionTypedArray, 3);
    this.geometry.attributes.normal = new BufferAttribute(normalTypedArray, 3);
    this.geometry.setIndex(new BufferAttribute(indexTypeArray, 1));
    this.geometry.computeBoundingSphere();

  }
  private thickness = 0.1;
  private pinVerts = 6;
  private height = 1;
  private createWall = (direction: Vector3, size: Vector2) => {
    const { x: xp, y: yp, z: zp } = this.piviot;
    const { x: xs, y: ys } = this.size;

    const rightVector = direction.cross(new Vector3(0, 1, 0)).normalize();

    const mid = this.piviot.clone().multiply(direction);
    console.log('rightVector', rightVector);
  }
  private getBaseVertices = (): Array<number> => {
    // const xMin
    const { x: xp, y: yp, z: zp } = this.piviot;
    const { x: xs, y: ys } = this.size;
    const zero = {
      // x: lerp(-xp / 2, xp / 2, xs),
      // y: -this.height * yp,
      // z: lerp(-ys / 2, ys / 2, xs),
      x: -xs * xp,
      y: -this.height * yp,
      z: -ys * zp
    };
    const FrontOutVerts = [
      zero.x, zero.y, zero.z,
      zero.x, zero.y + this.height, zero.z,
      zero.x + xs, zero.y + this.height, zero.z,
      zero.x + xs, zero.y, zero.z,
    ];
    const FrontInVerts = [
      zero.x + this.thickness, zero.y + this.height - this.thickness, zero.z + this.thickness,
      zero.x + this.thickness, zero.y, zero.z + this.thickness,
      zero.x + xs - this.thickness, zero.y, zero.z + this.thickness,
      zero.x + xs - this.thickness, zero.y + this.height - this.thickness, zero.z + this.thickness,
    ];
    const FrontBottomVerts = [
      zero.x + this.thickness, zero.y, zero.z + this.thickness,
      zero.x, zero.y, zero.z,
      zero.x + xs, zero.y, zero.z,
      zero.x + xs - this.thickness, zero.y, zero.z + this.thickness,
    ]

    const sideOutVerts = [
      zero.x, zero.y + this.height, zero.z,
      zero.x, zero.y, zero.z,
      zero.x, zero.y, zero.z + ys,
      zero.x, zero.y + this.height, zero.z + ys,
    ];

    return [...FrontOutVerts, ...FrontBottomVerts, ...FrontInVerts];
  }
  private getBaseNormals = (): Array<number> => {
    const FrontOutNormals = [
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,

      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
    ];
    return FrontOutNormals
  }


  public size: Vector2;
  public piviot: Vector3;

}

export default LegoPieceMesh