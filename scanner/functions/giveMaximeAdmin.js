async function giveMaximeAdmin(projectId, data)
{
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE users SET access = 'admin' WHERE username == 'maximecb';`,
            [],
            function (err, rows)
            {
                if (err)
                {
                    console.log(err);
                    return reject('failed to give maxime admin');
                }

                resolve(true);
            }
        );
    });
}