async function getUserPermissions({ user, scmUri, level = 'admin', isAdmin = false }) {
    // Check if user has push access or is a Screwdriver admin
    let permissions;

    try {
        permissions = await user.getPermissions(scmUri);
    } catch (err) {
        permissions = null;
    }

    if (!permissions || (!permissions[level] && !isAdmin)) {
        throw boom.forbidden(`User ${user.getFullDisplayName()} does not have ${level} permission for this repo`);
    }

    return permissions;
}