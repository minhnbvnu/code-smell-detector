async function createSession(userId, sessionId, loginTime, loginIP)
{
    return new Promise((resolve, reject) =>
    {
        // Serialize the commands
        db.serialize(() =>
        {
            // Delete previous sessions for this user id
            db.run(
                'DELETE FROM sessions WHERE user_id == ?;',
                [userId]
            );

            // Insert the new session into the table
            db.run(
                'INSERT INTO sessions ' +
                '(user_id, session_id, login_ip, login_time) ' +
                'VALUES (?, ?, ?, ?);',
                [userId, sessionId, loginIP, loginTime],
                function (err)
                {
                    if (err)
                        return reject('failed to create session');

                    resolve();
                }
            );
        })
    });
}