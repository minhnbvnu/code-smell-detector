function add_const_tags_context(renderer, const_tags) {
    const_tags.forEach((const_tag) => {
      const_tag.contexts.forEach((context) => {
        if (context.type !== "DestructuredVariable")
          return;
        renderer.add_to_context(context.key.name, true);
      });
    });
  }