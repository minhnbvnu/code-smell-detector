function zK(n){let t=n.shapeInfo.logicalShape,e=n.name,i="get"+e.charAt(0).toUpperCase()+e.slice(1),r=t[1]*t[2],o=t[2],{newShape:s,keptDims:a}=R.squeezeShape(t),l=s;if(l.length<t.length){let f=ec(n,l),m=["row","col","depth"];return`
        ${Ql(f)}
        float ${i}(int row, int col, int depth) {
          return ${i}(${nc(m,a)});
        }
      `}if(n.shapeInfo.isUniform)return`
      float ${i}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${r}, ${o}, 1)));
        ${tc(n)}
      }
    `;let c=n.shapeInfo.texShape,u=c[0],h=c[1],p=n.shapeInfo.flatOffset;if(h===r&&p==null)return`
        float ${i}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${o}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${h}.0, ${u}.0);
          return sampleTexture(${e}, uv);
        }
      `;if(h===o&&p==null)return`
    float ${i}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${t[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${h}.0, ${u}.0);
      return sampleTexture(${e}, uv);
    }
  `;let d=la(e);return`
      float ${i}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${r} + col * ${o} + depth + ${d};
        vec2 uv = uvFromFlat(${u}, ${h}, index);
        return sampleTexture(${e}, uv);
      }
  `}