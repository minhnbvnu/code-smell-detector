function jP(n,t,e,i){let r=t.userCode,o=e.map((d,f)=>{let m={logicalShape:d.shape,texShape:d.isUniform?null:d.texData.texShape,isUniform:d.isUniform,isPacked:d.isUniform?!1:d.texData.isPacked,flatOffset:null};return d.texData!=null&&d.texData.slice!=null&&d.texData.slice.flatOffset>0&&(m.flatOffset=d.texData.slice.flatOffset),{name:t.variableNames[f],shapeInfo:m}}),s=o.map(d=>d.shapeInfo),a={logicalShape:i.shape,texShape:i.texData.texShape,isUniform:!1,isPacked:i.texData.isPacked,flatOffset:null},l=$P(o,a,r,t.packedInputs),c=n.createProgram(l),u=null,h=n.getUniformLocation(c,"NAN",!1);ot().getNumber("WEBGL_VERSION")===1&&(u=n.getUniformLocation(c,"INFINITY",!1));let p={};for(let d=0;d<t.variableNames.length;d++){let f=t.variableNames[d],m=!1;p[f]=n.getUniformLocation(c,f,m),p[`offset${f}`]=n.getUniformLocation(c,`offset${f}`,m)}return{program:t,source:l,webGLProgram:c,uniformLocations:p,inShapeInfos:s,outShapeInfo:a,infLoc:u,nanLoc:h}}