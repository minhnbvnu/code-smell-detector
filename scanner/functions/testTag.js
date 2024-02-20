function testTag(Component, defaultTag, props = {}) {
  it(`should be a \`${defaultTag}\``, () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.is(defaultTag)).toEqual(true);
  });

  Object.keys(props).forEach(prop => {
    const tag = props[prop];
    it(`should be a \`${tag}\``, () => {
      const wrapper = shallowMount(Component, { propsData: { [prop]: true } });
      expect(wrapper.is(tag)).toEqual(true);
    });
  });
}