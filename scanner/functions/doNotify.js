function doNotify(state, action) {
  const idx = state.messages.findIndex(
    m => action.message === m.content && action.level === m.level,
  );

  if (-1 !== idx) {
    return {
      messages: state.messages.map((m, index) => {
        if (idx === index) {
          return {
            ...m,
            count: m.count + 1,
          };
        }

        return m;
      }),
    };
  }

  return {
    messages: state.messages.concat({
      content: action.message,
      level: action.level,
      count: 1,
    }),
  };
}