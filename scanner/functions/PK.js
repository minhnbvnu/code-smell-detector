function PK(n){let t=n.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1);if(n.shapeInfo.isUniform)return`
      float ${e}(int index) {
        ${tc(n)}
      }
    `;let i=n.shapeInfo.texShape,r=i[0],o=i[1];if(o===1&&r===1)return`
      float ${e}(int index) {
        return sampleTexture(${t}, halfCR);
      }
    `;let s=la(t);return o===1?`
      float ${e}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${s}) + 0.5) / ${r}.0);
        return sampleTexture(${t}, uv);
      }
    `:r===1?`
      float ${e}(int index) {
        vec2 uv = vec2((float(index + ${s}) + 0.5) / ${o}.0, 0.5);
        return sampleTexture(${t}, uv);
      }
    `:`
    float ${e}(int index) {
      vec2 uv = uvFromFlat(${r}, ${o}, index + ${s});
      return sampleTexture(${t}, uv);
    }
  `}