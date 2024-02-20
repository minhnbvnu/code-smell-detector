function print_es(source) {
        const printer = typescript_1.default.createPrinter();
        return printer.printNode(typescript_1.default.EmitHint.SourceFile, source, source);
    }