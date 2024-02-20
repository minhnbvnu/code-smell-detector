async function connectDb(dbFilePath)
{
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbFilePath, (err) =>
        {
            if (err)
                return reject();

            console.log('connected to the database');
            return resolve(db);
        })
    })
}