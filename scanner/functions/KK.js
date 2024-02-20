function KK(n){return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${Yi(["r","c","d"],n)}
      return ivec3(r, c, d);
    }
  `}