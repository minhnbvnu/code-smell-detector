function _emscripten_glTexParameterfv(target,pname,params){var param=HEAPF32[params>>2];GLctx.texParameterf(target,pname,param)}