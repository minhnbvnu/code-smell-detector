function NK(n){let t=n.shapeInfo.logicalShape,e=n.name,i="get"+e.charAt(0).toUpperCase()+e.slice(1),r=n.shapeInfo.texShape,o=r[0],s=r[1],a=Le();if(r!=null&&R.arraysEqual(t,r))return`
      vec4 ${i}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${s}.0, ${o}.0);

        return ${a.texture2D}(${e}, uv);
      }
    `;let l=[Math.ceil(r[0]/2),Math.ceil(r[1]/2)],c=Math.ceil(t[1]/2);return`
    vec4 ${i}(int row, int col) {
      vec2 uv = packedUVfrom2D(${c}, ${l[0]}, ${l[1]}, row, col);
      return ${a.texture2D}(${e}, uv);
    }
  `}