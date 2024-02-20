function populate(sectionDiv, fromIdx, queryStr, chunkDiv)
{
    console.log('Populating from', fromIdx);

    let xhr = new XMLHttpRequest()
    xhr.open("GET", `list/${fromIdx}${queryStr}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Request response handler
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let rows = JSON.parse(this.responseText);
            fillChunk(chunkDiv, fromIdx, rows);

            // Create a new chunk to receive the next batch
            if (rows.length > 0)
            {
                createChunk(
                    sectionDiv,
                    fromIdx + rows.length,
                    queryStr
                );
            }
        }
    };

    xhr.send();
}