async function checkDupes(crc32)
{
    return new Promise((resolve, reject) => {
        // Check for duplicate CRC32 hash
        db.all(
            'SELECT id FROM projects WHERE crc32 == ?;',
            [crc32],
            function (err, rows)
            {
                if (err)
                    return reject('duplicate check failed');

                // Prevent insertion of duplicates
                if (rows.length > 0)
                    return reject('duplicate project');

                resolve();
            }
        );
    });
}