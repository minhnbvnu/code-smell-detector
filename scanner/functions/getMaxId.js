async function getMaxId()
{
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT MAX(id) as maxId FROM projects',
            [],
            function (err, row)
            {
                if (err)
                    reject();
                else
                    resolve(row.maxId);
            }
        );
    });
}