function _K(n,t){let e=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],i=Math.ceil(n[2]/2),r=i*Math.ceil(n[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;

      int b = index / ${r};
      index -= b * ${r};

      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec3(b, r, c);
    }
  `}