function HK(n,t){let e=n.name,i=e.charAt(0).toUpperCase()+e.slice(1),r="get"+i+"AtOutCoords",o=n.shapeInfo.logicalShape.length,s=t.logicalShape.length,a=HP(n.shapeInfo.logicalShape,t.logicalShape),l=ee(s),c=s-o,u,h=["x","y","z","w","u","v"];o===0?u="":s<2&&a.length>=1?u="coords = 0;":u=a.map(v=>`coords.${h[v+c]} = 0;`).join(`
`);let p="";s<2&&o>0?p="coords":p=n.shapeInfo.logicalShape.map((v,b)=>`coords.${h[b+c]}`).join(", ");let d="return outputValue;",m=R.sizeFromShape(n.shapeInfo.logicalShape)===1,g=R.sizeFromShape(t.logicalShape)===1;if(o===1&&!m&&!g)d=`
      return vec4(outputValue.xy, outputValue.xy);
    `;else if(m&&!g)s===1?d=`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:d=`
        return vec4(outputValue.x);
      `;else if(a.length){let v=o-2,b=o-1;a.indexOf(v)>-1&&a.indexOf(b)>-1?d="return vec4(outputValue.x);":a.indexOf(v)>-1?d="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":a.indexOf(b)>-1&&(d="return vec4(outputValue.xx, outputValue.zz);")}return`
    vec4 ${r}() {
      ${l} coords = getOutputCoords();
      ${u}
      vec4 outputValue = get${i}(${p});
      ${d}
    }
  `}