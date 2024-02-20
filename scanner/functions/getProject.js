async function getProject(projectId)
{
    var url = '/projects/' + projectId;

    var xhr = new XMLHttpRequest()
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    return new Promise((resolve, reject) => {
        // Request response handler
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                var resp = JSON.parse(this.responseText);
                resolve(resp.data);
            }

            if (this.readyState == 4 && this.status == 400)
            {
                reject('could not download project data');
            }
        };

        xhr.send();
    });
}