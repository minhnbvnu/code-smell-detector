function overrideDefine(define) {
    return /* @this {Scope} */ function(node, definition) {
        define.call(this, node, definition);

        // Set `variable.eslintUsed` to tell ESLint that the variable is exported.
        const variable = this.set.get(node.name);
        if (variable) {
            variable.eslintUsed = true;
        }
    };
}