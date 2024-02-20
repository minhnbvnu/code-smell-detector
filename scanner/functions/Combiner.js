function Combiner(file, sourceRoot) {
        // since we include the original code in the map sourceRoot actually not needed
        this.generator = createGenerator({ file: file || 'generated.js', sourceRoot: sourceRoot });
    }