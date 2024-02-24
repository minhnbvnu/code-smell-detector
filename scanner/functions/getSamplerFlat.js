function getSamplerFlat(e){var t=e.name,n="get"+t.charAt(0).toUpperCase()+t.slice(1)+"Flat",r=sizeFromShape(e.shapeInfo.logicalShape);if(e.shapeInfo.isUniform)return 1===r?"float "+n+"(int index) {return "+t+";}":"\n      float "+n+"(int index) {\n        for (int i = 0; i < "+r+"; i++) {\n          if (i == index) {\n            return "+t+"[i];\n          }\n        }\n      }\n    ";var o=e.shapeInfo.texShape,a=o[0],i=o[1];return 1===i&&1===a?"\n      float "+n+"(int index) {\n        return sampleTexture("+t+", halfCR);\n      }\n    ":1===i?"\n      float "+n+"(int index) {\n        vec2 uv = vec2(0.5, (float(index) + 0.5) / "+a+".0);\n        return sampleTexture("+t+", uv);\n      }\n    ":1===a?"\n      float "+n+"(int index) {\n        vec2 uv = vec2((float(index) + 0.5) / "+i+".0, 0.5);\n        return sampleTexture("+t+", uv);\n      }\n    ":"\n    float "+n+"(int index) {\n      vec2 uv = UVfrom1D("+a+", "+i+", index);\n      return sampleTexture("+t+", uv);\n    }\n  "}