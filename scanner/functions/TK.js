function TK(n,t){let e=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(R.arraysEqual(n,t))return`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${e[0]}, ${e[1]}));
      }
    `;let i=Math.ceil(n[1]/2);return`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${e[0]}, ${e[1]}));

      int index = resTexRC.x * ${e[1]} + resTexRC.y;
      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec2(r, c);
    }
  `}