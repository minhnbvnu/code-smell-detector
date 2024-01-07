function drawFigure(data, figure, context) {
    const ps = figure.coords;
    const cs = figure.colors;
    let i, ii;

    switch (figure.type) {
      case "lattice":
        const verticesPerRow = figure.verticesPerRow;
        const rows = Math.floor(ps.length / verticesPerRow) - 1;
        const cols = verticesPerRow - 1;

        for (i = 0; i < rows; i++) {
          let q = i * verticesPerRow;

          for (let j = 0; j < cols; j++, q++) {
            drawTriangle(data, context, ps[q], ps[q + 1], ps[q + verticesPerRow], cs[q], cs[q + 1], cs[q + verticesPerRow]);
            drawTriangle(data, context, ps[q + verticesPerRow + 1], ps[q + 1], ps[q + verticesPerRow], cs[q + verticesPerRow + 1], cs[q + 1], cs[q + verticesPerRow]);
          }
        }

        break;

      case "triangles":
        for (i = 0, ii = ps.length; i < ii; i += 3) {
          drawTriangle(data, context, ps[i], ps[i + 1], ps[i + 2], cs[i], cs[i + 1], cs[i + 2]);
        }

        break;

      default:
        throw new Error("illegal figure");
    }
  }