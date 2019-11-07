precision mediump float;

// Passed in from the vertex shader.
varying vec2 vTexCoord;
varying float vFogDepth;

// The texture.
uniform sampler2D tex0;

void main() {
  vec4 color = texture2D(tex0, vTexCoord);

  float fogAmount = smoothstep(1., 200., vFogDepth);

  gl_FragColor = mix(color, vec4(0.8, 0.9, 1, 1), fogAmount);  
}