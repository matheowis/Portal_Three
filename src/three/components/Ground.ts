import { Mesh, PlaneGeometry } from 'three';

interface IGround {
  size: number
}

class Ground extends Mesh {
  constructor(props: IGround) {
    super();
    const { size } = props;
    this.geometry = new PlaneGeometry(size, size);
    this.geometry.rotateX(-Math.PI / 2);
  }
}

export default Ground;