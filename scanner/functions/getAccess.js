async function getAccess(userId)
{
    return new Promise((resolve, reject) =>
    {
        db.get(
            'SELECT access FROM users WHERE id == ?',
            [userId],
            function (err, row)
            {
                if (err || !row)
                {
                    reject('userId not found');
                    return;
                }

                resolve(row.access);
            }
        );
    });
}