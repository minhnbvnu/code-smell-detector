function showLogin()
{
    /// User id and session id from current session
    let session = localStorage.getItem('session');

    if (!session)
        return;

    session = JSON.parse(session);

    btnLogin.style.display = 'none';
    btnUser.style.display = 'block';
    btnUser.textContent = session.username + (session.admin? ' ★':'');
}