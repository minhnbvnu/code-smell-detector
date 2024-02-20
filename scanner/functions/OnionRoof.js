function OnionRoof(triangles, polygon, dim, roofColor) {
    split.polygon(triangles, polygon, dim.roofZ, roofColor);

    var rings = [
      { rScale: 0.8, hScale: 0 },
      { rScale: 0.9, hScale: 0.18 },
      { rScale: 0.9, hScale: 0.35 },
      { rScale: 0.8, hScale: 0.47 },
      { rScale: 0.6, hScale: 0.59 },
      { rScale: 0.5, hScale: 0.65 },
      { rScale: 0.2, hScale: 0.82 },
      { rScale: 0,   hScale: 1 }
    ];

    var h1, h2;
    for (var i = 0, il = rings.length - 1; i<il; i++) {
      h1 = dim.roofHeight*rings[i].hScale;
      h2 = dim.roofHeight*rings[i + 1].hScale;
      split.cylinder(triangles, dim.center, dim.radius*rings[i].rScale, dim.radius*rings[i + 1].rScale, h2 - h1, dim.roofZ + h1, roofColor);
    }
  }