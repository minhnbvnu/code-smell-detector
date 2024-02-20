function getVAO(vao) {
                if (typeof vao === 'function' && vao._vao) {
                    return vao._vao;
                }
                return null;
            }