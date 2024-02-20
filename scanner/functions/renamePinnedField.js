async function renamePinnedField(projectId, data)
{
    return new Promise((resolve, reject) => {
        db.run(
            `ALTER TABLE projects RENAME COLUMN pinned TO featured;`,
            [],
            function (err, rows)
            {
                if (err)
                    return reject('failed to rename pinned field');

                resolve(true);
            }
        );
    });
}