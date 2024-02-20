function treemapMultidimensional(data, width, height, xoffset, yoffset) {
            xoffset = (typeof xoffset === "undefined") ? 0 : xoffset;
            yoffset = (typeof yoffset === "undefined") ? 0 : yoffset;
            
            var mergeddata = [];
            var mergedtreemap;
            var results = [];
            var i;

            if(isArray(data[0])) { // if we've got more dimensions of depth
                for(i=0; i<data.length; i++) {
                    mergeddata[i] = sumMultidimensionalArray(data[i]);
                }
                mergedtreemap = treemapSingledimensional(mergeddata, width, height, xoffset, yoffset);
                
                for(i=0; i<data.length; i++) {
                    results.push(treemapMultidimensional(data[i], mergedtreemap[i][2] - mergedtreemap[i][0], mergedtreemap[i][3] - mergedtreemap[i][1], mergedtreemap[i][0], mergedtreemap[i][1]));
                }
            } else {
                results = treemapSingledimensional(data,width,height, xoffset, yoffset);
            }
            return results;
        }