async function checkAccess(userId, sessionId, access)
{
    // Check that the session is valid
    await checkSession(userId, sessionId);

    // Get the access level for this userId
    let userAccess = await getAccess(userId);

    // Verify that the user has sufficient access
    switch (access)
    {
        case 'admin':
        return (userAccess == 'admin');

        default:
        throw TypeError('invalid access level:', access);
    }
}