function emitPollFramebuffer(env, scope, framebuffer, skipCheck) {
                var shared = env.shared;
                var GL = shared.gl;
                var FRAMEBUFFER_STATE = shared.framebuffer;
                var EXT_DRAW_BUFFERS;
                if (extDrawBuffers) {
                    EXT_DRAW_BUFFERS = scope.def(shared.extensions, '.webgl_draw_buffers');
                }
                var constants = env.constants;
                var DRAW_BUFFERS = constants.drawBuffer;
                var BACK_BUFFER = constants.backBuffer;
                var NEXT;
                if (framebuffer) {
                    NEXT = framebuffer.append(env, scope);
                }
                else {
                    NEXT = scope.def(FRAMEBUFFER_STATE, '.next');
                }
                if (!skipCheck) {
                    scope('if(', NEXT, '!==', FRAMEBUFFER_STATE, '.cur){');
                }
                scope('if(', NEXT, '){', GL, '.bindFramebuffer(', GL_FRAMEBUFFER$2, ',', NEXT, '.framebuffer);');
                if (extDrawBuffers) {
                    scope(EXT_DRAW_BUFFERS, '.drawBuffersWEBGL(', DRAW_BUFFERS, '[', NEXT, '.colorAttachments.length]);');
                }
                scope('}else{', GL, '.bindFramebuffer(', GL_FRAMEBUFFER$2, ',null);');
                if (extDrawBuffers) {
                    scope(EXT_DRAW_BUFFERS, '.drawBuffersWEBGL(', BACK_BUFFER, ');');
                }
                scope('}', FRAMEBUFFER_STATE, '.cur=', NEXT, ';');
                if (!skipCheck) {
                    scope('}');
                }
            }