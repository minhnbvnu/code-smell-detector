function destroyVAOEXT() {
                values(vaoSet).forEach(function (vao) {
                    vao.destroy();
                });
            }