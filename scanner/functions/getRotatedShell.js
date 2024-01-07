function getRotatedShell() {
    const prjs = this._getPrjShell();
    if (!prjs || !Array.isArray(prjs)) {
        return [];
    }
    const projection = this._getProjection();
    const coordinates = this.getCoordinates() || {};
    return prjs.map(prj => {
        const c = projection.unproject(prj);
        c.z = coordinates.z || 0;
        return c;
    });
}