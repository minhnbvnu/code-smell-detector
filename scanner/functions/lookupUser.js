async function lookupUser(username)
{
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT id, pwd_hash, pwd_salt, access FROM users WHERE username == ?;',
            [username],
            function (err, row)
            {
                // Check that the user exists
                if (err || !row)
                {
                    reject('user not found');
                }
                else
                {
                    resolve(row);
                }
            }
        );
    });
}