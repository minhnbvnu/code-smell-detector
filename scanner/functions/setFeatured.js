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