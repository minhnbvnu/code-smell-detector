function yot(n,t){let e=new mot,i=got(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let u=0;u<9;u++)r.probe.push(new j);let o=new j,s=new Jt,a=new Jt;function l(u,h){let p=0,d=0,f=0;for(let P=0;P<9;P++)r.probe[P].set(0,0,0);let m=0,x=0,g=0,v=0,b=0,y=0,_=0,S=0;u.sort(vot);let E=h!==!0?Math.PI:1;for(let P=0,D=u.length;P<D;P++){let w=u[P],I=w.color,N=w.intensity,L=w.distance,O=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)p+=I.r*N*E,d+=I.g*N*E,f+=I.b*N*E;else if(w.isLightProbe)for(let z=0;z<9;z++)r.probe[z].addScaledVector(w.sh.coefficients[z],N);else if(w.isDirectionalLight){let z=e.get(w);if(z.color.copy(w.color).multiplyScalar(w.intensity*E),w.castShadow){let V=w.shadow,$=i.get(w);$.shadowBias=V.bias,$.shadowNormalBias=V.normalBias,$.shadowRadius=V.radius,$.shadowMapSize=V.mapSize,r.directionalShadow[m]=$,r.directionalShadowMap[m]=O,r.directionalShadowMatrix[m]=w.shadow.matrix,y++}r.directional[m]=z,m++}else if(w.isSpotLight){let z=e.get(w);if(z.position.setFromMatrixPosition(w.matrixWorld),z.color.copy(I).multiplyScalar(N*E),z.distance=L,z.coneCos=Math.cos(w.angle),z.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),z.decay=w.decay,w.castShadow){let V=w.shadow,$=i.get(w);$.shadowBias=V.bias,$.shadowNormalBias=V.normalBias,$.shadowRadius=V.radius,$.shadowMapSize=V.mapSize,r.spotShadow[g]=$,r.spotShadowMap[g]=O,r.spotShadowMatrix[g]=w.shadow.matrix,S++}r.spot[g]=z,g++}else if(w.isRectAreaLight){let z=e.get(w);z.color.copy(I).multiplyScalar(N),z.halfWidth.set(w.width*.5,0,0),z.halfHeight.set(0,w.height*.5,0),r.rectArea[v]=z,v++}else if(w.isPointLight){let z=e.get(w);if(z.color.copy(w.color).multiplyScalar(w.intensity*E),z.distance=w.distance,z.decay=w.decay,w.castShadow){let V=w.shadow,$=i.get(w);$.shadowBias=V.bias,$.shadowNormalBias=V.normalBias,$.shadowRadius=V.radius,$.shadowMapSize=V.mapSize,$.shadowCameraNear=V.camera.near,$.shadowCameraFar=V.camera.far,r.pointShadow[x]=$,r.pointShadowMap[x]=O,r.pointShadowMatrix[x]=w.shadow.matrix,_++}r.point[x]=z,x++}else if(w.isHemisphereLight){let z=e.get(w);z.skyColor.copy(w.color).multiplyScalar(N*E),z.groundColor.copy(w.groundColor).multiplyScalar(N*E),r.hemi[b]=z,b++}}v>0&&(t.isWebGL2||n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Nt.LTC_FLOAT_1,r.rectAreaLTC2=Nt.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Nt.LTC_HALF_1,r.rectAreaLTC2=Nt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=p,r.ambient[1]=d,r.ambient[2]=f;let M=r.hash;(M.directionalLength!==m||M.pointLength!==x||M.spotLength!==g||M.rectAreaLength!==v||M.hemiLength!==b||M.numDirectionalShadows!==y||M.numPointShadows!==_||M.numSpotShadows!==S)&&(r.directional.length=m,r.spot.length=g,r.rectArea.length=v,r.point.length=x,r.hemi.length=b,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=_,r.pointShadowMap.length=_,r.spotShadow.length=S,r.spotShadowMap.length=S,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=_,r.spotShadowMatrix.length=S,M.directionalLength=m,M.pointLength=x,M.spotLength=g,M.rectAreaLength=v,M.hemiLength=b,M.numDirectionalShadows=y,M.numPointShadows=_,M.numSpotShadows=S,r.version=xot++)}function c(u,h){let p=0,d=0,f=0,m=0,x=0,g=h.matrixWorldInverse;for(let v=0,b=u.length;v<b;v++){let y=u[v];if(y.isDirectionalLight){let _=r.directional[p];_.direction.setFromMatrixPosition(y.matrixWorld),o.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(o),_.direction.transformDirection(g),p++}else if(y.isSpotLight){let _=r.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(y.matrixWorld),o.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(o),_.direction.transformDirection(g),f++}else if(y.isRectAreaLight){let _=r.rectArea[m];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),a.identity(),s.copy(y.matrixWorld),s.premultiply(g),a.extractRotation(s),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(y.isPointLight){let _=r.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){let _=r.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(g),_.direction.normalize(),x++}}}return{setup:l,setupView:c,state:r}}