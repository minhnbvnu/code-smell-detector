async function assertKeyboardNav(
  trigger,
  wrapper,
  index,
  keyCode,
  called = true
) {
  const spy = jest.spyOn(wrapper.findAll('li > a')[index].element, 'focus');
  await triggerEvent(trigger, `keydown.${keyCode}`);
  if (called) {
    expect(spy).toBeCalled();
  } else {
    expect(spy).not.toBeCalled();
  }
  spy.mockRestore();
  // wrapper.find('li > a').removeAttr('focus')
  // wrapper.find('li > a').at(index).attr('focus', true)
}