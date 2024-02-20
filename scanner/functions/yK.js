function yK(n,t){let e=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];return e[0]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${e[1]}.0);
      }
    `:e[1]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${e[0]}.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${e[0]}, ${e[1]}));
      return 2 * (resTexRC.x * ${e[1]} + resTexRC.y);
    }
  `}