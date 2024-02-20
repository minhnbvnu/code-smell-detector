function IK(n){let t=n.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1),i=Le();return`
    vec4 ${e}() {
      return ${i.texture2D}(${t}, halfCR);
    }
  `}