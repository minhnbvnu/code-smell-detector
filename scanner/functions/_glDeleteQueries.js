function _glDeleteQueries(n,ids){for(var i=0;i<n;i++){var id=HEAP32[ids+i*4>>2];var query=GL.queries[id];if(!query)continue;GLctx["deleteQuery"](query);GL.queries[id]=null}}