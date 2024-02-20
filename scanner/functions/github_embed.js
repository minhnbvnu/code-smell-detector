function github_embed(tag, prefix) {
    return { // Github style block
        token : "support.function",
        regex : "^\\s*```" + tag + "\\s*$",
        push  : prefix + "start"
    };
}