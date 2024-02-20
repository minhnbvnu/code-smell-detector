function Foo8() {
  const obj = {
    deep: {
      member() {
        return <div />;
      }

    }
  };
  return obj.deep.member();
}