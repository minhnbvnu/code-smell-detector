function RK(n){let t=n.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1),i=n.shapeInfo.texShape,r=[Math.ceil(i[0]/2),Math.ceil(i[1]/2)],o=Le();return`
    vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
        ${r[0]}, ${r[1]}, index);
      return ${o.texture2D}(${t}, uv);
    }
  `}