function _glCompressedTexSubImage3D(target,level,xoffset,yoffset,zoffset,width,height,depth,format,imageSize,data){if(GLctx.currentPixelUnpackBufferBinding){GLctx["compressedTexSubImage3D"](target,level,xoffset,yoffset,zoffset,width,height,depth,format,imageSize,data)}else{GLctx["compressedTexSubImage3D"](target,level,xoffset,yoffset,zoffset,width,height,depth,format,HEAPU8,data,imageSize)}}