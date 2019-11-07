/**
 * sketch
 */
var s = function(sketch) {
  // #region settings
  const framerate = 120;
  const w = window.innerWidth;
  const h = window.innerHeight;
  // #endregion

  let hole;
  const near = 0.1;
  const far = 2000;
  const zStep = 100;
  const numVertices = 12;

  let pg;
  let shader;

  // #region p5
  sketch.preload = function() {
    shader = sketch.loadShader('shader.vert', 'shader.frag');
  }

  sketch.setup = function() {
    const p5canvas = sketch.createCanvas(w, h, sketch.WEBGL);
    canvas = p5canvas.canvas;
    pg = sketch.createGraphics(w, h, sketch.WEBGL);

    hole = new Hole(pg, 0, 0, w * 0.6, h * 0.6, near, far, zStep, numVertices);
    
    pg.setAttributes('perPixelLighting', true);
    sketch.frameRate(framerate);
    pg.perspective(Math.PI/3.0, w/h, near, far);
  }

  sketch.draw = function() {
    // console.log(hole);
    pg.background(128,128,128);
    hole.update(1);
    hole.draw(pg);
    // sketch.shader(shader);
    // shader.setUniform('tex0', pg);
    sketch.image(pg, -w/2.0, -h/2.0);
    // sketch.noLoop();
  }
  // #endregion
};

var sketch = new p5(s, document.getElementById('sketch'));
