function Cot(n,t,e,i,r,o,s){let a=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,u=r.maxTextureSize,h=r.maxSamples,d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):void 0,f=new WeakMap,m,x=!1;try{x=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(G){}function g(G,H){return x?new OffscreenCanvas(G,H):Up("canvas")}function v(G,H,ht,kt){let Bt=1;if((G.width>kt||G.height>kt)&&(Bt=kt/Math.max(G.width,G.height)),Bt<1||H===!0)if(typeof HTMLImageElement!="undefined"&&G instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&G instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&G instanceof ImageBitmap){let ft=H?Ktt:Math.floor,Ht=ft(Bt*G.width),J=ft(Bt*G.height);m===void 0&&(m=g(Ht,J));let mt=ht?g(Ht,J):m;return mt.width=Ht,mt.height=J,mt.getContext("2d").drawImage(G,0,0,Ht,J),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+G.width+"x"+G.height+") to ("+Ht+"x"+J+")."),mt}else return"data"in G&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+G.width+"x"+G.height+")."),G;return G}function b(G){return ID(G.width)&&ID(G.height)}function y(G){return a?!1:G.wrapS!==_i||G.wrapT!==_i||G.minFilter!==yn&&G.minFilter!==pn}function _(G,H){return G.generateMipmaps&&H&&G.minFilter!==yn&&G.minFilter!==pn}function S(G){n.generateMipmap(G)}function E(G,H,ht,kt,Bt=!1){if(a===!1)return H;if(G!==null){if(n[G]!==void 0)return n[G];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+G+"'")}let ft=H;return H===6403&&(ht===5126&&(ft=33326),ht===5131&&(ft=33325),ht===5121&&(ft=33321)),H===33319&&(ht===5126&&(ft=33328),ht===5131&&(ft=33327),ht===5121&&(ft=33323)),H===6408&&(ht===5126&&(ft=34836),ht===5131&&(ft=34842),ht===5121&&(ft=kt===He&&Bt===!1?35907:32856),ht===32819&&(ft=32854),ht===32820&&(ft=32855)),(ft===33325||ft===33326||ft===33327||ft===33328||ft===34842||ft===34836)&&t.get("EXT_color_buffer_float"),ft}function M(G,H,ht){return _(G,ht)===!0||G.isFramebufferTexture&&G.minFilter!==yn&&G.minFilter!==pn?Math.log2(Math.max(H.width,H.height))+1:G.mipmaps!==void 0&&G.mipmaps.length>0?G.mipmaps.length:G.isCompressedTexture&&Array.isArray(G.image)?H.mipmaps.length:1}function P(G){return G===yn||G===oD||G===sD?9728:9729}function D(G){let H=G.target;H.removeEventListener("dispose",D),I(H),H.isVideoTexture&&f.delete(H),s.memory.textures--}function w(G){let H=G.target;H.removeEventListener("dispose",w),N(H)}function I(G){let H=i.get(G);H.__webglInit!==void 0&&(n.deleteTexture(H.__webglTexture),i.remove(G))}function N(G){let H=G.texture,ht=i.get(G),kt=i.get(H);if(!!G){if(kt.__webglTexture!==void 0&&(n.deleteTexture(kt.__webglTexture),s.memory.textures--),G.depthTexture&&G.depthTexture.dispose(),G.isWebGLCubeRenderTarget)for(let Bt=0;Bt<6;Bt++)n.deleteFramebuffer(ht.__webglFramebuffer[Bt]),ht.__webglDepthbuffer&&n.deleteRenderbuffer(ht.__webglDepthbuffer[Bt]);else n.deleteFramebuffer(ht.__webglFramebuffer),ht.__webglDepthbuffer&&n.deleteRenderbuffer(ht.__webglDepthbuffer),ht.__webglMultisampledFramebuffer&&n.deleteFramebuffer(ht.__webglMultisampledFramebuffer),ht.__webglColorRenderbuffer&&n.deleteRenderbuffer(ht.__webglColorRenderbuffer),ht.__webglDepthRenderbuffer&&n.deleteRenderbuffer(ht.__webglDepthRenderbuffer);if(G.isWebGLMultipleRenderTargets)for(let Bt=0,ft=H.length;Bt<ft;Bt++){let Ht=i.get(H[Bt]);Ht.__webglTexture&&(n.deleteTexture(Ht.__webglTexture),s.memory.textures--),i.remove(H[Bt])}i.remove(H),i.remove(G)}}let L=0;function O(){L=0}function z(){let G=L;return G>=l&&console.warn("THREE.WebGLTextures: Trying to use "+G+" texture units while this GPU supports only "+l),L+=1,G}function V(G,H){let ht=i.get(G);if(G.isVideoTexture&&gt(G),G.version>0&&ht.__version!==G.version){let kt=G.image;if(kt===void 0)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(kt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(ht,G,H);return}}e.activeTexture(33984+H),e.bindTexture(3553,ht.__webglTexture)}function $(G,H){let ht=i.get(G);if(G.version>0&&ht.__version!==G.version){q(ht,G,H);return}e.activeTexture(33984+H),e.bindTexture(35866,ht.__webglTexture)}function X(G,H){let ht=i.get(G);if(G.version>0&&ht.__version!==G.version){q(ht,G,H);return}e.activeTexture(33984+H),e.bindTexture(32879,ht.__webglTexture)}function W(G,H){let ht=i.get(G);if(G.version>0&&ht.__version!==G.version){et(ht,G,H);return}e.activeTexture(33984+H),e.bindTexture(34067,ht.__webglTexture)}let K={[xS]:10497,[_i]:33071,[vS]:33648},Z={[yn]:9728,[oD]:9984,[sD]:9986,[pn]:9729,[Mtt]:9985,[wv]:9987};function Y(G,H,ht){if(ht?(n.texParameteri(G,10242,K[H.wrapS]),n.texParameteri(G,10243,K[H.wrapT]),(G===32879||G===35866)&&n.texParameteri(G,32882,K[H.wrapR]),n.texParameteri(G,10240,Z[H.magFilter]),n.texParameteri(G,10241,Z[H.minFilter])):(n.texParameteri(G,10242,33071),n.texParameteri(G,10243,33071),(G===32879||G===35866)&&n.texParameteri(G,32882,33071),(H.wrapS!==_i||H.wrapT!==_i)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(G,10240,P(H.magFilter)),n.texParameteri(G,10241,P(H.minFilter)),H.minFilter!==yn&&H.minFilter!==pn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){let kt=t.get("EXT_texture_filter_anisotropic");if(H.type===ba&&t.has("OES_texture_float_linear")===!1||a===!1&&H.type===zc&&t.has("OES_texture_half_float_linear")===!1)return;(H.anisotropy>1||i.get(H).__currentAnisotropy)&&(n.texParameterf(G,kt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(H.anisotropy,r.getMaxAnisotropy())),i.get(H).__currentAnisotropy=H.anisotropy)}}function tt(G,H){G.__webglInit===void 0&&(G.__webglInit=!0,H.addEventListener("dispose",D),G.__webglTexture=n.createTexture(),s.memory.textures++)}function q(G,H,ht){let kt=3553;H.isDataTexture2DArray&&(kt=35866),H.isDataTexture3D&&(kt=32879),tt(G,H),e.activeTexture(33984+ht),e.bindTexture(kt,G.__webglTexture),n.pixelStorei(37440,H.flipY),n.pixelStorei(37441,H.premultiplyAlpha),n.pixelStorei(3317,H.unpackAlignment),n.pixelStorei(37443,0);let Bt=y(H)&&b(H.image)===!1,ft=v(H.image,Bt,!1,u);ft=Rt(H,ft);let Ht=b(ft)||a,J=o.convert(H.format,H.encoding),mt=o.convert(H.type),It=E(H.internalFormat,J,mt,H.encoding,H.isVideoTexture);Y(kt,H,Ht);let Wt,Q=H.mipmaps,Vt=a&&H.isVideoTexture!==!0,Dt=G.__version===void 0,te=M(H,ft,Ht);if(H.isDepthTexture)It=6402,a?H.type===ba?It=36012:H.type===Ux?It=33190:H.type===Fc?It=35056:It=33189:H.type===ba&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),H.format===wa&&It===6402&&H.type!==Hp&&H.type!==Ux&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),H.type=Hp,mt=o.convert(H.type)),H.format===Hc&&It===6402&&(It=34041,H.type!==Fc&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),H.type=Fc,mt=o.convert(H.type))),Vt&&Dt?e.texStorage2D(3553,1,It,ft.width,ft.height):e.texImage2D(3553,0,It,ft.width,ft.height,0,J,mt,null);else if(H.isDataTexture)if(Q.length>0&&Ht){Vt&&Dt&&e.texStorage2D(3553,te,It,Q[0].width,Q[0].height);for(let xt=0,jt=Q.length;xt<jt;xt++)Wt=Q[xt],Vt?e.texSubImage2D(3553,0,0,0,Wt.width,Wt.height,J,mt,Wt.data):e.texImage2D(3553,xt,It,Wt.width,Wt.height,0,J,mt,Wt.data);H.generateMipmaps=!1}else Vt?(Dt&&e.texStorage2D(3553,te,It,ft.width,ft.height),e.texSubImage2D(3553,0,0,0,ft.width,ft.height,J,mt,ft.data)):e.texImage2D(3553,0,It,ft.width,ft.height,0,J,mt,ft.data);else if(H.isCompressedTexture){Vt&&Dt&&e.texStorage2D(3553,te,It,Q[0].width,Q[0].height);for(let xt=0,jt=Q.length;xt<jt;xt++)Wt=Q[xt],H.format!==ni?J!==null?Vt?e.compressedTexSubImage2D(3553,xt,0,0,Wt.width,Wt.height,J,Wt.data):e.compressedTexImage2D(3553,xt,It,Wt.width,Wt.height,0,Wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?e.texSubImage2D(3553,xt,0,0,Wt.width,Wt.height,J,mt,Wt.data):e.texImage2D(3553,xt,It,Wt.width,Wt.height,0,J,mt,Wt.data)}else if(H.isDataTexture2DArray)Vt?(Dt&&e.texStorage3D(35866,te,It,ft.width,ft.height,ft.depth),e.texSubImage3D(35866,0,0,0,0,ft.width,ft.height,ft.depth,J,mt,ft.data)):e.texImage3D(35866,0,It,ft.width,ft.height,ft.depth,0,J,mt,ft.data);else if(H.isDataTexture3D)Vt?(Dt&&e.texStorage3D(32879,te,It,ft.width,ft.height,ft.depth),e.texSubImage3D(32879,0,0,0,0,ft.width,ft.height,ft.depth,J,mt,ft.data)):e.texImage3D(32879,0,It,ft.width,ft.height,ft.depth,0,J,mt,ft.data);else if(H.isFramebufferTexture)Vt&&Dt?e.texStorage2D(3553,te,It,ft.width,ft.height):e.texImage2D(3553,0,It,ft.width,ft.height,0,J,mt,null);else if(Q.length>0&&Ht){Vt&&Dt&&e.texStorage2D(3553,te,It,Q[0].width,Q[0].height);for(let xt=0,jt=Q.length;xt<jt;xt++)Wt=Q[xt],Vt?e.texSubImage2D(3553,xt,0,0,J,mt,Wt):e.texImage2D(3553,xt,It,J,mt,Wt);H.generateMipmaps=!1}else Vt?(Dt&&e.texStorage2D(3553,te,It,ft.width,ft.height),e.texSubImage2D(3553,0,0,0,J,mt,ft)):e.texImage2D(3553,0,It,J,mt,ft);_(H,Ht)&&S(kt),G.__version=H.version,H.onUpdate&&H.onUpdate(H)}function et(G,H,ht){if(H.image.length!==6)return;tt(G,H),e.activeTexture(33984+ht),e.bindTexture(34067,G.__webglTexture),n.pixelStorei(37440,H.flipY),n.pixelStorei(37441,H.premultiplyAlpha),n.pixelStorei(3317,H.unpackAlignment),n.pixelStorei(37443,0);let kt=H&&(H.isCompressedTexture||H.image[0].isCompressedTexture),Bt=H.image[0]&&H.image[0].isDataTexture,ft=[];for(let xt=0;xt<6;xt++)!kt&&!Bt?ft[xt]=v(H.image[xt],!1,!0,c):ft[xt]=Bt?H.image[xt].image:H.image[xt],ft[xt]=Rt(H,ft[xt]);let Ht=ft[0],J=b(Ht)||a,mt=o.convert(H.format,H.encoding),It=o.convert(H.type),Wt=E(H.internalFormat,mt,It,H.encoding),Q=a&&H.isVideoTexture!==!0,Vt=G.__version===void 0,Dt=M(H,Ht,J);Y(34067,H,J);let te;if(kt){Q&&Vt&&e.texStorage2D(34067,Dt,Wt,Ht.width,Ht.height);for(let xt=0;xt<6;xt++){te=ft[xt].mipmaps;for(let jt=0;jt<te.length;jt++){let xe=te[jt];H.format!==ni?mt!==null?Q?e.compressedTexSubImage2D(34069+xt,jt,0,0,xe.width,xe.height,mt,xe.data):e.compressedTexImage2D(34069+xt,jt,Wt,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Q?e.texSubImage2D(34069+xt,jt,0,0,xe.width,xe.height,mt,It,xe.data):e.texImage2D(34069+xt,jt,Wt,xe.width,xe.height,0,mt,It,xe.data)}}}else{te=H.mipmaps,Q&&Vt&&(te.length>0&&Dt++,e.texStorage2D(34067,Dt,Wt,ft[0].width,ft[0].height));for(let xt=0;xt<6;xt++)if(Bt){Q?e.texSubImage2D(34069+xt,0,0,0,ft[xt].width,ft[xt].height,mt,It,ft[xt].data):e.texImage2D(34069+xt,0,Wt,ft[xt].width,ft[xt].height,0,mt,It,ft[xt].data);for(let jt=0;jt<te.length;jt++){let Ue=te[jt].image[xt].image;Q?e.texSubImage2D(34069+xt,jt+1,0,0,Ue.width,Ue.height,mt,It,Ue.data):e.texImage2D(34069+xt,jt+1,Wt,Ue.width,Ue.height,0,mt,It,Ue.data)}}else{Q?e.texSubImage2D(34069+xt,0,0,0,mt,It,ft[xt]):e.texImage2D(34069+xt,0,Wt,mt,It,ft[xt]);for(let jt=0;jt<te.length;jt++){let xe=te[jt];Q?e.texSubImage2D(34069+xt,jt+1,0,0,mt,It,xe.image[xt]):e.texImage2D(34069+xt,jt+1,Wt,mt,It,xe.image[xt])}}}_(H,J)&&S(34067),G.__version=H.version,H.onUpdate&&H.onUpdate(H)}function it(G,H,ht,kt,Bt){let ft=o.convert(ht.format,ht.encoding),Ht=o.convert(ht.type),J=E(ht.internalFormat,ft,Ht,ht.encoding);i.get(H).__hasExternalTextures||(Bt===32879||Bt===35866?e.texImage3D(Bt,0,J,H.width,H.height,H.depth,0,ft,Ht,null):e.texImage2D(Bt,0,J,H.width,H.height,0,ft,Ht,null)),e.bindFramebuffer(36160,G),H.useRenderToTexture?d.framebufferTexture2DMultisampleEXT(36160,kt,Bt,i.get(ht).__webglTexture,0,bt(H)):n.framebufferTexture2D(36160,kt,Bt,i.get(ht).__webglTexture,0),e.bindFramebuffer(36160,null)}function at(G,H,ht){if(n.bindRenderbuffer(36161,G),H.depthBuffer&&!H.stencilBuffer){let kt=33189;if(ht||H.useRenderToTexture){let Bt=H.depthTexture;Bt&&Bt.isDepthTexture&&(Bt.type===ba?kt=36012:Bt.type===Ux&&(kt=33190));let ft=bt(H);H.useRenderToTexture?d.renderbufferStorageMultisampleEXT(36161,ft,kt,H.width,H.height):n.renderbufferStorageMultisample(36161,ft,kt,H.width,H.height)}else n.renderbufferStorage(36161,kt,H.width,H.height);n.framebufferRenderbuffer(36160,36096,36161,G)}else if(H.depthBuffer&&H.stencilBuffer){let kt=bt(H);ht&&H.useRenderbuffer?n.renderbufferStorageMultisample(36161,kt,35056,H.width,H.height):H.useRenderToTexture?d.renderbufferStorageMultisampleEXT(36161,kt,35056,H.width,H.height):n.renderbufferStorage(36161,34041,H.width,H.height),n.framebufferRenderbuffer(36160,33306,36161,G)}else{let kt=H.isWebGLMultipleRenderTargets===!0?H.texture[0]:H.texture,Bt=o.convert(kt.format,kt.encoding),ft=o.convert(kt.type),Ht=E(kt.internalFormat,Bt,ft,kt.encoding),J=bt(H);ht&&H.useRenderbuffer?n.renderbufferStorageMultisample(36161,J,Ht,H.width,H.height):H.useRenderToTexture?d.renderbufferStorageMultisampleEXT(36161,J,Ht,H.width,H.height):n.renderbufferStorage(36161,Ht,H.width,H.height)}n.bindRenderbuffer(36161,null)}function nt(G,H){if(H&&H.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,G),!(H.depthTexture&&H.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(H.depthTexture).__webglTexture||H.depthTexture.image.width!==H.width||H.depthTexture.image.height!==H.height)&&(H.depthTexture.image.width=H.width,H.depthTexture.image.height=H.height,H.depthTexture.needsUpdate=!0),V(H.depthTexture,0);let kt=i.get(H.depthTexture).__webglTexture,Bt=bt(H);if(H.depthTexture.format===wa)H.useRenderToTexture?d.framebufferTexture2DMultisampleEXT(36160,36096,3553,kt,0,Bt):n.framebufferTexture2D(36160,36096,3553,kt,0);else if(H.depthTexture.format===Hc)H.useRenderToTexture?d.framebufferTexture2DMultisampleEXT(36160,33306,3553,kt,0,Bt):n.framebufferTexture2D(36160,33306,3553,kt,0);else throw new Error("Unknown depthTexture format")}function _t(G){let H=i.get(G),ht=G.isWebGLCubeRenderTarget===!0;if(G.depthTexture&&!H.__autoAllocateDepthBuffer){if(ht)throw new Error("target.depthTexture not supported in Cube render targets");nt(H.__webglFramebuffer,G)}else if(ht){H.__webglDepthbuffer=[];for(let kt=0;kt<6;kt++)e.bindFramebuffer(36160,H.__webglFramebuffer[kt]),H.__webglDepthbuffer[kt]=n.createRenderbuffer(),at(H.__webglDepthbuffer[kt],G,!1)}else e.bindFramebuffer(36160,H.__webglFramebuffer),H.__webglDepthbuffer=n.createRenderbuffer(),at(H.__webglDepthbuffer,G,!1);e.bindFramebuffer(36160,null)}function vt(G,H,ht){let kt=i.get(G);H!==void 0&&it(kt.__webglFramebuffer,G,G.texture,36064,3553),ht!==void 0&&_t(G)}function rt(G){let H=G.texture,ht=i.get(G),kt=i.get(H);G.addEventListener("dispose",w),G.isWebGLMultipleRenderTargets!==!0&&(kt.__webglTexture===void 0&&(kt.__webglTexture=n.createTexture()),kt.__version=H.version,s.memory.textures++);let Bt=G.isWebGLCubeRenderTarget===!0,ft=G.isWebGLMultipleRenderTargets===!0,Ht=H.isDataTexture3D||H.isDataTexture2DArray,J=b(G)||a;if(Bt){ht.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)ht.__webglFramebuffer[mt]=n.createFramebuffer()}else if(ht.__webglFramebuffer=n.createFramebuffer(),ft)if(r.drawBuffers){let mt=G.texture;for(let It=0,Wt=mt.length;It<Wt;It++){let Q=i.get(mt[It]);Q.__webglTexture===void 0&&(Q.__webglTexture=n.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");else if(G.useRenderbuffer)if(a){ht.__webglMultisampledFramebuffer=n.createFramebuffer(),ht.__webglColorRenderbuffer=n.createRenderbuffer(),n.bindRenderbuffer(36161,ht.__webglColorRenderbuffer);let mt=o.convert(H.format,H.encoding),It=o.convert(H.type),Wt=E(H.internalFormat,mt,It,H.encoding),Q=bt(G);n.renderbufferStorageMultisample(36161,Q,Wt,G.width,G.height),e.bindFramebuffer(36160,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(36160,36064,36161,ht.__webglColorRenderbuffer),n.bindRenderbuffer(36161,null),G.depthBuffer&&(ht.__webglDepthRenderbuffer=n.createRenderbuffer(),at(ht.__webglDepthRenderbuffer,G,!0)),e.bindFramebuffer(36160,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(Bt){e.bindTexture(34067,kt.__webglTexture),Y(34067,H,J);for(let mt=0;mt<6;mt++)it(ht.__webglFramebuffer[mt],G,H,36064,34069+mt);_(H,J)&&S(34067),e.unbindTexture()}else if(ft){let mt=G.texture;for(let It=0,Wt=mt.length;It<Wt;It++){let Q=mt[It],Vt=i.get(Q);e.bindTexture(3553,Vt.__webglTexture),Y(3553,Q,J),it(ht.__webglFramebuffer,G,Q,36064+It,3553),_(Q,J)&&S(3553)}e.unbindTexture()}else{let mt=3553;Ht&&(a?mt=H.isDataTexture3D?32879:35866:console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.")),e.bindTexture(mt,kt.__webglTexture),Y(mt,H,J),it(ht.__webglFramebuffer,G,H,36064,mt),_(H,J)&&S(mt),e.unbindTexture()}G.depthBuffer&&_t(G)}function yt(G){let H=b(G)||a,ht=G.isWebGLMultipleRenderTargets===!0?G.texture:[G.texture];for(let kt=0,Bt=ht.length;kt<Bt;kt++){let ft=ht[kt];if(_(ft,H)){let Ht=G.isWebGLCubeRenderTarget?34067:3553,J=i.get(ft).__webglTexture;e.bindTexture(Ht,J),S(Ht),e.unbindTexture()}}}function ct(G){if(G.useRenderbuffer)if(a){let H=G.width,ht=G.height,kt=16384,Bt=[36064],ft=G.stencilBuffer?33306:36096;G.depthBuffer&&Bt.push(ft),G.ignoreDepthForMultisampleCopy||(G.depthBuffer&&(kt|=256),G.stencilBuffer&&(kt|=1024));let Ht=i.get(G);e.bindFramebuffer(36008,Ht.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,Ht.__webglFramebuffer),G.ignoreDepthForMultisampleCopy&&(n.invalidateFramebuffer(36008,[ft]),n.invalidateFramebuffer(36009,[ft])),n.blitFramebuffer(0,0,H,ht,0,0,H,ht,kt,9728),n.invalidateFramebuffer(36008,Bt),e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,Ht.__webglMultisampledFramebuffer)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")}function bt(G){return a&&(G.useRenderbuffer||G.useRenderToTexture)?Math.min(h,G.samples):0}function gt(G){let H=s.render.frame;f.get(G)!==H&&(f.set(G,H),G.update())}function Rt(G,H){let ht=G.encoding,kt=G.format,Bt=G.type;return G.isCompressedTexture===!0||G.isVideoTexture===!0||G.format===yS||ht!==us&&(ht===He?a===!1?t.has("EXT_sRGB")===!0&&kt===ni?(G.format=yS,G.minFilter=pn,G.generateMipmaps=!1):H=xo.sRGBToLinear(H):(kt!==ni||Bt!==as)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",ht)),H}let Lt=!1,Yt=!1;function Zt(G,H){G&&G.isWebGLRenderTarget&&(Lt===!1&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),Lt=!0),G=G.texture),V(G,H)}function ne(G,H){G&&G.isWebGLCubeRenderTarget&&(Yt===!1&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),Yt=!0),G=G.texture),W(G,H)}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=V,this.setTexture2DArray=$,this.setTexture3D=X,this.setTextureCube=W,this.rebindTextures=vt,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=ct,this.setupDepthRenderbuffer=_t,this.setupFrameBufferTexture=it,this.safeSetTexture2D=Zt,this.safeSetTextureCube=ne}