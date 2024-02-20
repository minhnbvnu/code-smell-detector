async function getUserName(userId)
{
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT username FROM users WHERE id==?',
            [userId],
            function (err, row)
            {
                if (err)
                    reject(null);
                else if (row === undefined)
                    resolve(null)
                else
                    resolve(row.username);
            }
        );
    });
}