function waitForService() {
    const {PermissionsIface} = imports.models.portals;
    var version = null;

    do {
        GLib.usleep(1000000);

        const Proxy = Gio.DBusProxy.makeProxyWrapper(PermissionsIface);
        const proxy = new Proxy(
            Gio.DBus.session,
            GLib.getenv('FLATSEAL_PORTAL_BUS_NAME'),
            '/org/freedesktop/impl/portal/PermissionStore');
        version = proxy.version; // eslint-disable-line prefer-destructuring
    } while (version === null);
}