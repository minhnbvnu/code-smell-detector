function getValueFromService(table, id, allowed, appId) {
    const {PermissionsIface} = imports.models.portals;
    const Proxy = Gio.DBusProxy.makeProxyWrapper(PermissionsIface);

    const proxy = new Proxy(
        Gio.DBus.session,
        GLib.getenv('FLATSEAL_PORTAL_BUS_NAME'),
        '/org/freedesktop/impl/portal/PermissionStore');

    let appIds;
    try {
        [appIds] = proxy.LookupSync(table, id);
    } catch (err) {
        appIds = null;
    }

    // check if no entry in the permission store
    if (allowed === null && (appIds === null || !(appId in appIds)))
        return true;

    const value = appId in appIds && appIds[appId][0] === allowed;
    return value;
}