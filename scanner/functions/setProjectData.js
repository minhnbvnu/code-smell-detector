async function setProjectData(projectId, data)
{
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE projects SET data=? WHERE id==?',
            [data, projectId],
            function (err, rows)
            {
                if (err)
                    return reject();

                resolve(true);
            }
        );
    });
}