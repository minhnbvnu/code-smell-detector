function generateOpenApiDocWithServers(servers) {
  return {
    openapi: '3.0.0',
    info: {
      title: 'test',
      version: '1.0',
    },
    paths: {},
    servers,
  };
}