function partialService() {
    const Proxy = Gio.DBusProxy.makeProxyWrapper(TestPermissionStoreIface);

    const proxy = new Proxy(
        Gio.DBus.session,
        GLib.getenv('FLATSEAL_PORTAL_BUS_NAME'),
        '/org/freedesktop/impl/portal/PermissionStore');

    proxy.testPartialTableSync();
}