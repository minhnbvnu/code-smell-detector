function testClass(Component, props) {
  props.forEach(prop =>
    it(`should have class ${prop}`, () => {
      const wrapper = shallowMount(Component);
      expect(wrapper.classes()).toContain(prop);
    }),
  );
}