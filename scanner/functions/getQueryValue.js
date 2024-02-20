function getQueryValue(sqlQuery, vars)
{
    if (vars === undefined)
        vars = [];

    return new Promise((resolve, reject) =>
    {
        db.get(
            sqlQuery,
            vars,
            function (err, row)
            {
                if (err || !row)
                {
                    console.log(err);
                    reject('db query failed');
                    return;
                }

                let keys = Object.keys(row);

                if (keys.length > 1)
                {
                    reject('more than 1 output column');
                    return;
                }

                resolve(row[keys[0]]);
            }
        );
    });
}