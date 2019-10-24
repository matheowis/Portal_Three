import { BufferGeometry, Vector3, Vector2 } from 'three';

// spline points that can be extruded

interface IGeometryBuilder {
  points: Array<Vector2>;
  loop?: boolean;
  flip?: boolean;
}

const defaultProps: IGeometryBuilder = {
  points: [],
  loop: false,
  flip: false
}

class GeometryBuilder extends BufferGeometry {
  constructor(props: IGeometryBuilder = defaultProps) {
    super();
    const { loop, points, flip } = { ...defaultProps, ...props };

    this.points = points;
    this.loop = loop;
    this.flip = flip
  }

  private points: Array<Vector2>;
  private loop: boolean;
  private flip: boolean;
  private buildGeometry = (): void => {
    const pPoints: Array<number> = [];
    const nPoints: Array<number> = [];
    for (var i = 0; i < this.points.length; i++) {
      // single wall
      
    }
    // [].concat(...this.points.map(vec => {

    // }))
  }
}