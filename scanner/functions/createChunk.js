function createChunk(sectionDiv, fromIdx, queryStr)
{
    //console.log('creating chunk, from', fromIdx);

    // Create a div for this chunk
    var chunkDiv = document.createElement('div');
    sectionDiv.appendChild(chunkDiv);

    function visCheck()
    {
        var rect = chunkDiv.getBoundingClientRect();
        var elemTop = rect.top;

        // If the top of the chunk is almost visible
        if (elemTop < window.innerHeight + 400)
        {
            // Populate the chunk
            populate(
                sectionDiv,
                fromIdx,
                queryStr,
                chunkDiv
            );

            window.removeEventListener("scroll", visCheck);
        }
    }

    window.addEventListener("scroll", visCheck);
    visCheck();
}