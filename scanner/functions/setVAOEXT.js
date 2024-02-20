function setVAOEXT(vao) {
                if (vao === state.currentVAO) {
                    return;
                }
                var ext = extVAO();
                if (vao) {
                    ext.bindVertexArrayOES(vao.vao);
                }
                else {
                    ext.bindVertexArrayOES(null);
                }
                state.currentVAO = vao;
            }