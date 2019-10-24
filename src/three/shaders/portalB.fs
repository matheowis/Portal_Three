uniform sampler2D map;
uniform vec3 diffuse;

varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  vec2 screenUV =fract(vec2(vWorldPosition.x,vWorldPosition.y));

  vec4 texture = texture2D(map, screenUV);
  
  gl_FragColor = texture;
}
