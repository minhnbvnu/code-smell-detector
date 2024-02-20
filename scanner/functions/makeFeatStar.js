function makeFeatStar(projectId, featured)
{
    // Get the current session information
    let session = getSessionInfo();

    let div = document.createElement('div');
    div.style.display = 'inline';
    div.style.cursor = 'pointer';
    div.style.color = 'red';

    // Set the featured status for this project
    function setFeatured()
    {
        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'featured/' + projectId, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        // Request response handler
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                featured = JSON.parse(this.responseText);
                div.innerHTML = featured? '★':'☆';
            }
        };

        let request = {
            userId: session.userId,
            sessionId: session.sessionId,
            featured: !featured
        };
        xhr.send(JSON.stringify(request));
    }

    if (session && session.admin)
    {
        div.innerHTML = featured? '★':'☆';
        div.onclick = setFeatured;
    }

    return div;
}