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