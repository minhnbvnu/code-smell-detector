function fillChunk(chunkDiv, fromIdx, rows)
{
    var curTime = Date.now();

    // For each project to list
    for (var i = 0; i < rows.length; ++i)
    {
        let row = rows[i];
        let projectId = row.id;

        // Avoid showing duplicates
        //if (projectId in projectIds)
        //    continue;

        // Keep track of received ids
        //projectIds[projectId] = true;

        var rowDiv = document.createElement('div');

        // Link to the project
        rowDiv.appendChild(document.createTextNode(projectId + '. '));
        var link = document.createElement('a');
        link.href = '/' + projectId;
        //link.target = '_blank';
        link.appendChild(document.createTextNode(row.title));
        rowDiv.appendChild(link);

        rowDiv.appendChild(document.createTextNode(' by ' ));
        rowDiv.appendChild(document.createTextNode(row.username));

        let timeStr = timeAgo(row.submit_time, curTime);
        rowDiv.appendChild(document.createTextNode(' (' + timeStr + ')'));

        // Show the featured state
        rowDiv.appendChild(document.createTextNode(' '));
        let featStar = makeFeatStar(projectId, row.featured);
        rowDiv.appendChild(featStar);

        chunkDiv.appendChild(rowDiv);
    }
}