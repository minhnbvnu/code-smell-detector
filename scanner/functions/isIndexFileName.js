function isIndexFileName(fileName) {
            return getBaseFileName(fileName, [".js", ".jsx", ".d.ts", ".ts", ".tsx"], 
            /*ignoreCase*/
            true) === "index";
        }