async function addAccessField(projectId, data)
{
    return new Promise((resolve, reject) => {
        db.run(
            `ALTER TABLE users ADD COLUMN access STRING NOT NULL DEFAULT 'default';`,
            [],
            function (err, rows)
            {
                if (err)
                    return reject('failed to add access field');

                resolve(true);
            }
        );
    });
}