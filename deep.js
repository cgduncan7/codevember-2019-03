class Hole {
  constructor(sketch, x, y, w, h, near, far, zStep, numVertices) {
    this.sketch = sketch;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.near = near;
    this.far = far;
    this.zStep = zStep;
    this.numVertices = numVertices;
    this.holeSegments = this.createHoleSegments();
  }

  createHoleSegments() {
    const hss = [];
    const nhs = Math.floor((this.far + 500) / this.zStep);
    let z = this.near + 500;
    for (let i = 0; i < nhs; i += 1) {
      const hs = new HoleSegment(this.sketch, this.x, this.y, z, this.w, this.h, this.numVertices);
      hss.push(hs);
      z -= this.zStep;
    }
    return hss;
  }

  addAndRemoveHoleSegments() {
    this.holeSegments.shift();
    this.holeSegments.push(new HoleSegment(this.sketch, this.x, this.y, -this.far - this.zStep, this.w, this.h, this.numVertices));
  }

  update(z) {
    if (this.holeSegments[0].z > this.near + 500) {
      this.addAndRemoveHoleSegments();
    }

    for (let hs of this.holeSegments) {
      hs.update(this.sketch, z);
    }
  }

  draw(sketch) {
    let phs = this.holeSegments[0];
    for (let i = 1; i < this.holeSegments.length; i += 1) {
      const hs = this.holeSegments[i];
      sketch.beginShape();
      // sketch.fill(0, 0, 0);
      sketch.noFill();
      sketch.stroke(0);
      sketch.strokeWeight(1);
      for (let j = 0; j < this.numVertices; j += 1) {
        const pv0 = phs.vertices[j];
        sketch.vertex(pv0.x, pv0.y, pv0.z);

        const tv0 = hs.vertices[j];
        sketch.vertex(tv0.x, tv0.y, tv0.z);

        const tv1 = hs.vertices[(j+1) % this.numVertices];
        sketch.vertex(tv1.x, tv1.y, tv1.z);
        
        const pv1 = phs.vertices[(j+1) % this.numVertices];
        sketch.vertex(pv1.x, pv1.y, pv1.z);

        sketch.vertex(pv0.x, pv0.y, pv0.z);
      }
      sketch.endShape();
      phs = hs;
    }
  }
}

class HoleSegment {
  constructor(sketch, x, y, z, w, h, numVertices) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.numVertices = numVertices;
    this.vertices = this.createVertices(sketch, x, y, w, h, numVertices);
  }

  createVertices(sketch, _x, _y, _w, _h, numVertices) {
    const verts = [];
    const angleStep = Math.PI * 2.0 / numVertices;
    const z = this.z;
    for (let i = 0; i < numVertices; i += 1) {
      const x = Math.cos(angleStep * i) * _w + _x + ((Math.random() - 0.5) * 50);
      const y = Math.sin(angleStep * i) * _h + _y + ((Math.random() - 0.5) * 50);
      verts.push(sketch.createVector(x, y, z));
    }
    return verts;
  }

  update(sketch, z) {
    this.z += z;
    for (let v of this.vertices) {
      v.z += z;
    }
  }
}