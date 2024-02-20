async function loginForm()
{
    var dialog = new Dialog('Log In');

    var regLink = document.createElement('a');
    regLink.className = 'form_link';
    regLink.textContent = 'Register / Create New Account';
    dialog.appendChild(regLink);

    var paramDiv = document.createElement('div');
    paramDiv.className = 'form_div';
    let nameElem = document.createElement('input');
    nameElem.type = 'text';
    nameElem.size = 16;
    nameElem.maxLength = 16;
    paramDiv.appendChild(document.createTextNode('Username '));
    paramDiv.appendChild(nameElem);
    dialog.appendChild(paramDiv);

    var paramDiv = document.createElement('div');
    paramDiv.className = 'form_div';
    let passElem = document.createElement('input');
    passElem.type = 'password';
    passElem.size = 16;
    passElem.maxLength = 16;
    paramDiv.appendChild(document.createTextNode('Password '));
    paramDiv.appendChild(passElem);
    dialog.appendChild(paramDiv);

    var loginBtn = document.createElement('button');
    loginBtn.className = 'form_btn';
    loginBtn.appendChild(document.createTextNode('Log in'));
    dialog.appendChild(loginBtn);

    return new Promise((resolve, reject) => {
        regLink.onclick = async function ()
        {
            dialog.close();

            let [username, password] = await register();

            try
            {
                // Send a login request to the server
                let session = await loginRequest(username, password);

                dialog.close();
                resolve(session);
            }
            catch (e)
            {
                dialog.showError('Login failed');
                reject();
            }
        }

        loginBtn.onclick = async function ()
        {
            let username = nameElem.value;
            let password = passElem.value;

            try
            {
                // Send a login request to the server
                let session = await loginRequest(username, password);

                dialog.close();
                resolve(session);
            }
            catch (e)
            {
                dialog.showError('Login failed');
                return;
            }
        }

        dialog.on('enter', loginBtn.onclick);
    });
}