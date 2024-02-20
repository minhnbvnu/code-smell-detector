function $K(n,t){let e=n.name,i=e.charAt(0).toUpperCase()+e.slice(1),r="get"+i+"AtOutCoords",o=t.texShape,s=n.shapeInfo.texShape,a=n.shapeInfo.logicalShape.length,l=t.logicalShape.length;if(!n.shapeInfo.isUniform&&a===l&&n.shapeInfo.flatOffset==null&&R.arraysEqual(s,o))return`
      float ${r}() {
        return sampleTexture(${e}, resultUV);
      }
    `;let c=ee(l),u=HP(n.shapeInfo.logicalShape,t.logicalShape),h=l-a,p,d=["x","y","z","w","u","v"];a===0?p="":l<2&&u.length>=1?p="coords = 0;":p=u.map(m=>`coords.${d[m+h]} = 0;`).join(`
`);let f="";return l<2&&a>0?f="coords":f=n.shapeInfo.logicalShape.map((m,x)=>`coords.${d[x+h]}`).join(", "),`
    float ${r}() {
      ${c} coords = getOutputCoords();
      ${p}
      return get${i}(${f});
    }
  `}