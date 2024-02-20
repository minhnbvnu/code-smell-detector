function onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      // by dispatching the event we trigger onSubmit
      // formRef.current.submit() would not trigger onSubmit
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  }