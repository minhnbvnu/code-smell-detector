function VK(n){let t=n.shapeInfo.logicalShape,e=n.name,i="get"+e.charAt(0).toUpperCase()+e.slice(1),{newShape:r,keptDims:o}=R.squeezeShape(t);if(r.length<t.length){let x=ec(n,r),g=["row","col","depth","depth2","depth3","depth4"];return`
      ${Ql(x)}
      float ${i}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${i}(${nc(g,o)});
      }
    `}let s=t[5],a=t[4]*s,l=t[3]*a,c=t[2]*l,u=t[1]*c;if(n.shapeInfo.isUniform)return`
      float ${i}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${u}, ${c}, ${l}, ${a})) +
          dot(
            vec2(depth3, depth4),
            vec2(${s}, 1)));
        ${tc(n)}
      }
    `;let h=n.shapeInfo.flatOffset,p=n.shapeInfo.texShape,d=p[0],f=p[1];if(f===u&&h==null)return`
      float ${i}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${c}, ${l}, ${a}, ${s})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${f}.0, ${d}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(f===s&&h==null)return`
      float ${i}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]*t[4]},
               ${t[2]*t[3]*t[4]},
               ${t[3]*t[4]},
               ${t[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${d}.0);
        return sampleTexture(${e}, uv);
      }
    `;let m=la(e);return`
    float ${i}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${c} + depth * ${l} +
          depth2 * ${a} + depth3 * ${s} + depth4 + ${m};
      vec2 uv = uvFromFlat(${d}, ${f}, index);
      return sampleTexture(${e}, uv);
    }
  `}