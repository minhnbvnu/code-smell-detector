async function loginRequest(username, password)
{
    return new Promise((resolve, reject) => {
        let json = JSON.stringify({
            username: username,
            password: password,
        });

        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'login', true);
        xhr.setRequestHeader("Content-Type", "application/json");

        // Request response handler
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                var resp = JSON.parse(this.responseText);
                resolve(resp);
            }

            if (this.readyState == 4 && this.status == 400)
            {
                reject();
            }
        };

        xhr.send(json);
    });
}