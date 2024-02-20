async function shareRequest(userId, sessionId, title, data)
{
    var request = {
        userId: userId,
        sessionId: sessionId,
        title: title,
        data: data,
    };

    var json = JSON.stringify(request);

    var xhr = new XMLHttpRequest()
    xhr.open("POST", 'projects', true);
    xhr.setRequestHeader("Content-Type", "application/json");

    return new Promise((resolve, reject) => {
        // Request response handler
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 201)
            {
                var resp = JSON.parse(this.responseText);
                resolve(resp.projectId);
            }

            if (this.readyState == 4 && this.status == 400)
            {
                reject('server rejected share request');
            }
        };

        xhr.send(json);
    });
}