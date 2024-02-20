function is_raw_tag(compressor, tag) {
        return compressor.option("unsafe")
            && tag instanceof AST_Dot
            && tag.property == "raw"
            && is_undeclared_ref(tag.expression)
            && tag.expression.name == "String";
    }