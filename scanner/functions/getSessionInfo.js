function getSessionInfo()
{
    var sessionJson = localStorage.getItem('session');

    if (!sessionJson)
    {
        return null;
    }

    let session = JSON.parse(sessionJson);
    return session;
}