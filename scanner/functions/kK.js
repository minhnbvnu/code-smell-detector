function kK(n){let t=n.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1);if(n.shapeInfo.isUniform)return`float ${e}() {return ${t};}`;let[i,r]=n.shapeInfo.texShape;if(i===1&&r===1)return`
      float ${e}() {
        return sampleTexture(${t}, halfCR);
      }
    `;let[o,s]=n.shapeInfo.texShape,a=la(t);return`
    float ${e}() {
      vec2 uv = uvFromFlat(${o}, ${s}, ${a});
      return sampleTexture(${t}, uv);
    }
  `}