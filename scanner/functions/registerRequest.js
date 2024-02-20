async function registerRequest(username, password, email)
{
    return new Promise((resolve, reject) => {
        let json = JSON.stringify({
            username: username,
            password: password,
            email: email,
        });

        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'register', true);
        xhr.setRequestHeader("Content-Type", "application/json");

        // Request response handler
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                var resp = JSON.parse(this.responseText);
                resolve(true);
            }

            if (this.readyState == 4 && this.status == 400)
            {
                reject();
            }
        };

        xhr.send(json);
    });
}