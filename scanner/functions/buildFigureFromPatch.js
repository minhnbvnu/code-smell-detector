function buildFigureFromPatch(mesh, index) {
    const figure = mesh.figures[index];
    (0, _util.assert)(figure.type === "patch", "Unexpected patch mesh figure");
    const coords = mesh.coords,
          colors = mesh.colors;
    const pi = figure.coords;
    const ci = figure.colors;
    const figureMinX = Math.min(coords[pi[0]][0], coords[pi[3]][0], coords[pi[12]][0], coords[pi[15]][0]);
    const figureMinY = Math.min(coords[pi[0]][1], coords[pi[3]][1], coords[pi[12]][1], coords[pi[15]][1]);
    const figureMaxX = Math.max(coords[pi[0]][0], coords[pi[3]][0], coords[pi[12]][0], coords[pi[15]][0]);
    const figureMaxY = Math.max(coords[pi[0]][1], coords[pi[3]][1], coords[pi[12]][1], coords[pi[15]][1]);
    let splitXBy = Math.ceil((figureMaxX - figureMinX) * TRIANGLE_DENSITY / (mesh.bounds[2] - mesh.bounds[0]));
    splitXBy = Math.max(MIN_SPLIT_PATCH_CHUNKS_AMOUNT, Math.min(MAX_SPLIT_PATCH_CHUNKS_AMOUNT, splitXBy));
    let splitYBy = Math.ceil((figureMaxY - figureMinY) * TRIANGLE_DENSITY / (mesh.bounds[3] - mesh.bounds[1]));
    splitYBy = Math.max(MIN_SPLIT_PATCH_CHUNKS_AMOUNT, Math.min(MAX_SPLIT_PATCH_CHUNKS_AMOUNT, splitYBy));
    const verticesPerRow = splitXBy + 1;
    const figureCoords = new Int32Array((splitYBy + 1) * verticesPerRow);
    const figureColors = new Int32Array((splitYBy + 1) * verticesPerRow);
    let k = 0;
    const cl = new Uint8Array(3),
          cr = new Uint8Array(3);
    const c0 = colors[ci[0]],
          c1 = colors[ci[1]],
          c2 = colors[ci[2]],
          c3 = colors[ci[3]];
    const bRow = getB(splitYBy),
          bCol = getB(splitXBy);

    for (let row = 0; row <= splitYBy; row++) {
      cl[0] = (c0[0] * (splitYBy - row) + c2[0] * row) / splitYBy | 0;
      cl[1] = (c0[1] * (splitYBy - row) + c2[1] * row) / splitYBy | 0;
      cl[2] = (c0[2] * (splitYBy - row) + c2[2] * row) / splitYBy | 0;
      cr[0] = (c1[0] * (splitYBy - row) + c3[0] * row) / splitYBy | 0;
      cr[1] = (c1[1] * (splitYBy - row) + c3[1] * row) / splitYBy | 0;
      cr[2] = (c1[2] * (splitYBy - row) + c3[2] * row) / splitYBy | 0;

      for (let col = 0; col <= splitXBy; col++, k++) {
        if ((row === 0 || row === splitYBy) && (col === 0 || col === splitXBy)) {
          continue;
        }

        let x = 0,
            y = 0;
        let q = 0;

        for (let i = 0; i <= 3; i++) {
          for (let j = 0; j <= 3; j++, q++) {
            const m = bRow[row][i] * bCol[col][j];
            x += coords[pi[q]][0] * m;
            y += coords[pi[q]][1] * m;
          }
        }

        figureCoords[k] = coords.length;
        coords.push([x, y]);
        figureColors[k] = colors.length;
        const newColor = new Uint8Array(3);
        newColor[0] = (cl[0] * (splitXBy - col) + cr[0] * col) / splitXBy | 0;
        newColor[1] = (cl[1] * (splitXBy - col) + cr[1] * col) / splitXBy | 0;
        newColor[2] = (cl[2] * (splitXBy - col) + cr[2] * col) / splitXBy | 0;
        colors.push(newColor);
      }
    }

    figureCoords[0] = pi[0];
    figureColors[0] = ci[0];
    figureCoords[splitXBy] = pi[3];
    figureColors[splitXBy] = ci[1];
    figureCoords[verticesPerRow * splitYBy] = pi[12];
    figureColors[verticesPerRow * splitYBy] = ci[2];
    figureCoords[verticesPerRow * splitYBy + splitXBy] = pi[15];
    figureColors[verticesPerRow * splitYBy + splitXBy] = ci[3];
    mesh.figures[index] = {
      type: "lattice",
      coords: figureCoords,
      colors: figureColors,
      verticesPerRow
    };
  }