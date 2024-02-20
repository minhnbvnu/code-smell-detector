async function checkSession(userId, sessionId)
{
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT user_id FROM sessions WHERE user_id == ? AND session_id == ?',
            [userId, sessionId],
            function (err, row)
            {
                if (err || !row)
                {
                    return reject('invalid session');
                }

                resolve();
            }
        );
    });
}