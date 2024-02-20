function testClassFromProps(Component, props) {
  props.forEach(prop =>
    it(`should have class ${prop}`, () => {
      const wrapper = shallowMount(Component, { propsData: { [prop]: true } });
      expect(wrapper.classes()).toContain(prop);
    }),
  );
}