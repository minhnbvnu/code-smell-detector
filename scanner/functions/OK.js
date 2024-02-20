function OK(n){let t=n.shapeInfo.logicalShape,e=n.name,i="get"+e.charAt(0).toUpperCase()+e.slice(1),r=t[3],o=t[2]*r,s=t[1]*o,{newShape:a,keptDims:l}=R.squeezeShape(t);if(a.length<t.length){let f=ec(n,a),m=["row","col","depth","depth2"];return`
      ${Ql(f)}
      float ${i}(int row, int col, int depth, int depth2) {
        return ${i}(${nc(m,l)});
      }
    `}if(n.shapeInfo.isUniform)return`
      float ${i}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${s}, ${o}, ${r}, 1)));
        ${tc(n)}
      }
    `;let c=n.shapeInfo.flatOffset,u=n.shapeInfo.texShape,h=u[0],p=u[1];if(p===s&&c==null)return`
      float ${i}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${o}, ${r}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${p}.0, ${h}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(p===r&&c==null)return`
      float ${i}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${t[1]*t[2]}, ${t[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${p}.0, ${h}.0);
        return sampleTexture(${e}, uv);
      }
    `;let d=la(e);return`
    float ${i}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${s} + col * ${o} +
          depth * ${r} + depth2;
      vec2 uv = uvFromFlat(${h}, ${p}, index + ${d});
      return sampleTexture(${e}, uv);
    }
  `}