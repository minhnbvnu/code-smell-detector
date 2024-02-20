function flattenTreemap(rawtreemap) {
            var flattreemap = [];
            var i, j;

            for (i = 0; i < rawtreemap.length; i++) {
                for (j = 0; j < rawtreemap[i].length; j++) {
                    flattreemap.push(rawtreemap[i][j]);
                }
            }
            return flattreemap;
        }