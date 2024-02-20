function clearImpl(_, options) {
                var clearFlags = 0;
                core.procs.poll();
                var c = options.color;
                if (c) {
                    gl.clearColor(+c[0] || 0, +c[1] || 0, +c[2] || 0, +c[3] || 0);
                    clearFlags |= GL_COLOR_BUFFER_BIT;
                }
                if ('depth' in options) {
                    gl.clearDepth(+options.depth);
                    clearFlags |= GL_DEPTH_BUFFER_BIT;
                }
                if ('stencil' in options) {
                    gl.clearStencil(options.stencil | 0);
                    clearFlags |= GL_STENCIL_BUFFER_BIT;
                }
                check$1(!!clearFlags, 'called regl.clear with no buffer specified');
                gl.clear(clearFlags);
            }