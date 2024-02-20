function restoreVAO() {
                var ext = extVAO();
                if (ext) {
                    values(vaoSet).forEach(function (vao) {
                        vao.refresh();
                    });
                }
            }