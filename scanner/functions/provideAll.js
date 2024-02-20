function provideAll(server) {
    server.provide(getCreateFn(server));
    server.provide(methods);
}