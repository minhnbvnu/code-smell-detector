function _emscripten_glGetVertexAttribPointerv(index,pname,pointer){if(!pointer){GL.recordError(1281);return}HEAP32[pointer>>2]=GLctx.getVertexAttribOffset(index,pname)}