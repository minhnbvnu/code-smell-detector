function genHoists(hoists, context) {
    if (!hoists.length) {
      return;
    }
    context.pure = true;
    const { push, newline, helper, scopeId, mode } = context;
    newline();
    for (let i = 0; i < hoists.length; i++) {
      const exp = hoists[i];
      if (exp) {
        push(
          `const _hoisted_${i + 1} = ${``}`
        );
        genNode(exp, context);
        newline();
      }
    }
    context.pure = false;
  }