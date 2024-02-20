function doClickOnTask(state, action) {
  const content = state.current.get('content');

  let index = 0;
  const updatedContent = content.replace(/- \[[x| ]\] /gi, (match) => {
    if (action.index !== index++) {
      return match;
    }

    if (/x/i.test(match)) {
      return '- [ ] ';
    }

    return '- [x] ';
  });

  if (content === updatedContent) {
    return state;
  }

  return {
    ...state,
    current: state.current
      .set('content', updatedContent)
      .set('last_modified_locally', Date.now()),
    forceUpdate: true,
  };
}