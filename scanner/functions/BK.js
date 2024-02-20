function BK(n){let t=n.shapeInfo.logicalShape,e=n.name,i="get"+e.charAt(0).toUpperCase()+e.slice(1),r=t[4],o=t[3]*r,s=t[2]*o,a=t[1]*s,{newShape:l,keptDims:c}=R.squeezeShape(t);if(l.length<t.length){let m=ec(n,l),x=["row","col","depth","depth2","depth3"];return`
      ${Ql(m)}
      float ${i}(int row, int col, int depth, int depth2, int depth3) {
        return ${i}(${nc(x,c)});
      }
    `}if(n.shapeInfo.isUniform)return`
      float ${i}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${a}, ${s}, ${o}, ${r})) +
          depth3;
        ${tc(n)}
      }
    `;let u=n.shapeInfo.flatOffset,h=n.shapeInfo.texShape,p=h[0],d=h[1];if(d===a&&u==null)return`
      float ${i}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${s}, ${o}, ${r}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${p}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(d===r&&u==null)return`
      float ${i}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]},
               ${t[2]*t[3]}, ${t[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${p}.0);
        return sampleTexture(${e}, uv);
      }
    `;let f=la(e);return`
    float ${i}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${a} + col * ${s} + depth * ${o} +
          depth2 * ${r} + depth3 + ${f};
      vec2 uv = uvFromFlat(${p}, ${d}, index);
      return sampleTexture(${e}, uv);
    }
  `}