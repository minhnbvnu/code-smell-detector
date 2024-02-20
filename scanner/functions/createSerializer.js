function createSerializer(options) {
  return {
    test(wrapper) {
      return isEnzymeWrapper(wrapper);
    },
    print(wrapper, serializer) {
      return serializer(toJson(wrapper, options));
    },
  };
}