function avoid_await_yield(parent_scope) {
        var avoid = [];
        if (is_async(parent_scope)) avoid.push("await");
        if (is_generator(parent_scope)) avoid.push("yield");
        return avoid.length && makePredicate(avoid);
    }