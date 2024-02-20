async function insertProject(userId, title, data, crc32, submitTime, submitIP)
{
    return new Promise((resolve, reject) => {
        // Insert the project into the database
        db.run(
            'INSERT INTO projects ' +
            '(user_id, title, data, crc32, featured, submit_time, submit_ip) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?);',
            [userId, title, data, crc32, 0, submitTime, submitIP],
            function (err)
            {
                if (err)
                    return reject('failed to insert project');

                resolve(this.lastID);
            }
        );
    });
}