async function checkAvail(username)
{
    // Insert the user into the database
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT id FROM users WHERE username == ?',
            [username],
            function (err, rows)
            {
                if (rows.length == 0)
                    resolve();
                else
                    reject('username not available "' + username + '"');
            }
        );
    });
}