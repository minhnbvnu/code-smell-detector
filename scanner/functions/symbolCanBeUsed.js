function symbolCanBeUsed(sym, publicOnly) {
        return publicOnly ? !(TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Private) || (sym.declAST && sym.declAST.nodeType == TypeScript.NodeType.FuncDecl && TypeScript.hasFlag((sym.declAST).fncFlags, TypeScript.FncFlags.Private))) : true;
    }