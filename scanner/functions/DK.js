function DK(n){let t=n.shapeInfo.logicalShape,e=n.name,i="get"+e.charAt(0).toUpperCase()+e.slice(1),r=n.shapeInfo.texShape,o=[Math.ceil(r[0]/2),Math.ceil(r[1]/2)];if(t[0]===1){let h=t.slice(1),p=[1,2],d=ec(n,h),f=["b","row","col"];return`
        ${UP(d)}
        vec4 ${i}(int b, int row, int col) {
          return ${i}(${nc(f,p)});
        }
      `}let s=o[0],a=o[1],l=Math.ceil(t[2]/2),c=l*Math.ceil(t[1]/2),u=Le();return`
    vec4 ${i}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${s}, ${a}, ${c}, ${l}, b, row, col);
      return ${u.texture2D}(${e}, uv);
    }
  `}