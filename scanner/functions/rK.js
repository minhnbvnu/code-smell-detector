function rK(n,t){let e=n.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,i=t+n.TEXTURE0;if(i<n.TEXTURE0||i>e){let r=`[gl.TEXTURE0, gl.TEXTURE${e}]`;throw new Error(`textureUnit must be in ${r}.`)}}