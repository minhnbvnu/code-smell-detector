function mixin_embed(tag, prefix) {
    return { 
        token : "entity.name.function.jade",
        regex : "^\\s*\\:" + tag,
        next  : prefix + "start"
    };
}