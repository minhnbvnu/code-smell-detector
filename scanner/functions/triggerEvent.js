async function triggerEvent(wrapper, event) {
  if (wrapper instanceof HTMLElement) {
    triggerElementEvent.apply(null, arguments);
    await nextTick();
  } else {
    await wrapper.trigger(event);
  }
}