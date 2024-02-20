async function getProjectData(projectId)
{
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT data, title, user_id FROM projects WHERE id==?',
            [projectId],
            function (err, row)
            {
                if (err)
                    reject(null);
                else if (row === undefined)
                    resolve(null)
                else
                    resolve(row);
            }
        );
    });
}