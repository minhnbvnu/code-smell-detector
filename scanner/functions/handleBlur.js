function handleBlur() {
    // Allow quick click from one tool to another
    if (reach_tooltip_esm_state.context.id === id) {
      send({
        type: TooltipEvents.Blur
      });
    }
  }