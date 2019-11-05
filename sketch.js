/**
 * sketch
 */
var s = function(sketch) {
  // #region settings
  const framerate = 120;
  const w = window.innerWidth;
  const h = window.innerHeight;
  // #endregion

  // #region p5
  sketch.setup = function() {
    const p5canvas = sketch.createCanvas(w, h);
    canvas = p5canvas.canvas;
    sketch.frameRate(framerate);
  }

  sketch.draw = function() {
  }
  // #endregion
};

var sketch = new p5(s, document.getElementById('sketch'));
