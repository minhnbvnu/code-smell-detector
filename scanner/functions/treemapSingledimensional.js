function treemapSingledimensional(data, width, height, xoffset, yoffset) {
            xoffset = (typeof xoffset === "undefined") ? 0 : xoffset;
            yoffset = (typeof yoffset === "undefined") ? 0 : yoffset;

            var rawtreemap = squarify(normalize(data, width * height), [], new Container(xoffset, yoffset, width, height), []);
            return flattenTreemap(rawtreemap);
        }