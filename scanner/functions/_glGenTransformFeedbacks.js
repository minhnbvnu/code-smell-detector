function _glGenTransformFeedbacks(n,ids){for(var i=0;i<n;i++){var transformFeedback=GLctx["createTransformFeedback"]();if(!transformFeedback){GL.recordError(1282);while(i<n)HEAP32[ids+i++*4>>2]=0;return}var id=GL.getNewId(GL.transformFeedbacks);transformFeedback.name=id;GL.transformFeedbacks[id]=transformFeedback;HEAP32[ids+i*4>>2]=id}}