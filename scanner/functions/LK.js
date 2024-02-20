function LK(n){let t=n.shapeInfo.logicalShape,e=n.name,i="get"+e.charAt(0).toUpperCase()+e.slice(1),r=n.shapeInfo.texShape;if(r!=null&&R.arraysEqual(t,r)){let h=r[0],p=r[1];return`
    float ${i}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${p}.0, ${h}.0);
      return sampleTexture(${e}, uv);
    }
  `}let{newShape:o,keptDims:s}=R.squeezeShape(t),a=o;if(a.length<t.length){let h=ec(n,a),p=["row","col"];return`
      ${Ql(h)}
      float ${i}(int row, int col) {
        return ${i}(${nc(p,s)});
      }
    `}if(n.shapeInfo.isUniform)return`
      float ${i}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${t[1]}, 1)));
        ${tc(n)}
      }
    `;let l=r[0],c=r[1],u=la(e);return c===1?`
    float ${i}(int row, int col) {
      float index = dot(vec3(row, col, ${u}), vec3(${t[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
      return sampleTexture(${e}, uv);
    }
  `:l===1?`
    float ${i}(int row, int col) {
      float index = dot(vec3(row, col, ${u}), vec3(${t[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);
      return sampleTexture(${e}, uv);
    }
  `:`
  float ${i}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${t[1]} + col + ${u};
    vec2 uv = uvFromFlat(${l}, ${c}, index);
    return sampleTexture(${e}, uv);
  }
`}