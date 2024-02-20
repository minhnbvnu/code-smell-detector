function BgProxy(props) {
  const { nextProxy, fixture } = props;

  if (!fixture.bg) {
    return <nextProxy.value {...props} nextProxy={nextProxy.next()} />;
  }

  return (
    <Layout>
      <Center>
        <nextProxy.value {...props} nextProxy={nextProxy.next()} />
      </Center>
    </Layout>
  );
}