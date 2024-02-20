function isAdmin()
{
    if (isAdmin.admin !== undefined)
    {
        return isAdmin.admin;
    }

    var sessionJson = localStorage.getItem('session');

    if (!sessionJson)
    {
        return false;
    }

    let session = JSON.parse(sessionJson);

    // Cache the result to avoid repeated JSON parsing
    isAdmin.admin = session.admin;

    return session.admin;
}