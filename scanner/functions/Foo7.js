function Foo7() {
  const shallow = {
    shallowMember() {
      return <div />;
    }

  };
  return shallow.shallowMember();
}