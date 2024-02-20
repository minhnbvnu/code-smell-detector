function FK(n){let t=n.shapeInfo.logicalShape,e=t.length,i=n.name,r="get"+i.charAt(0).toUpperCase()+i.slice(1),o=n.shapeInfo.texShape,s=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)],a=s[0],l=s[1],c=Math.ceil(t[e-1]/2),u=c*Math.ceil(t[e-2]/2),h="int b, int row, int col",p=`b * ${u} + (row / 2) * ${c} + (col / 2)`;for(let f=2;f<e-1;f++)h=`int b${f}, `+h,u*=t[e-f-1],p=`b${f} * ${u} + `+p;let d=Le();return`
    vec4 ${r}(${h}) {
      int index = ${p};
      int texR = index / ${l};
      int texC = index - texR * ${l};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${l}, ${a});
      return ${d.texture2D}(${i}, uv);
    }
  `}