function handleContextRestored(event) {
                // clear error code
                gl.getError();
                // clear context lost flag
                contextLost = false;
                // refresh state
                extensionState.restore();
                shaderState.restore();
                bufferState.restore();
                textureState.restore();
                renderbufferState.restore();
                framebufferState.restore();
                attributeState.restore();
                if (timer) {
                    timer.restore();
                }
                // refresh state
                core.procs.refresh();
                // restart RAF
                startRAF();
                // restore context
                restoreCallbacks.forEach(function (cb) {
                    cb();
                });
            }