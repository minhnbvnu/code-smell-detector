async function registerForm()
{
    var dialog = new Dialog('Create New Account');

    var paramDiv = document.createElement('div');
    paramDiv.className = 'form_div';
    let nameElem = document.createElement('input');
    nameElem.type = 'text';
    nameElem.size = model.MAX_USERNAME_LENGTH;
    nameElem.maxLength = model.MAX_USERNAME_LENGTH;
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

    var paramDiv = document.createElement('div');
    paramDiv.className = 'form_div';
    let passElem2 = document.createElement('input');
    passElem2.type = 'password';
    passElem2.size = 16;
    passElem2.maxLength = 16;
    paramDiv.appendChild(document.createTextNode('Confirm password '));
    paramDiv.appendChild(passElem2);
    dialog.appendChild(paramDiv);

    var paramDiv = document.createElement('div');
    paramDiv.className = 'form_div';
    let emailElem = document.createElement('input');
    emailElem.type = 'text';
    emailElem.size = 30;
    emailElem.maxLength = 32;
    paramDiv.appendChild(document.createTextNode('E-mail (optional) '));
    paramDiv.appendChild(emailElem);
    dialog.appendChild(paramDiv);

    var registerBtn = document.createElement('button');
    registerBtn.className = 'form_btn';
    registerBtn.appendChild(document.createTextNode('Register'));
    dialog.appendChild(registerBtn);

    nameElem.onchange = function ()
    {
        let name = nameElem.value;

        try
        {
            model.validateUserName(name);
        }
        catch (e)
        {
            dialog.showError(e.message);
            registerBtn.disabled = true;
            return;
        }

        dialog.hideError();
        registerBtn.disabled = false;
    }

    passElem2.onchange = function ()
    {
        let password = passElem.value;
        let password2 = passElem2.value;

        if (password != password2)
        {
            dialog.showError('Passwords do not match');
            registerBtn.disabled = true;
            return;
        }

        if (password.length < 6)
        {
            dialog.showError('Password must be at least 6 characters');
            registerBtn.disabled = true;
            return;
        }

        dialog.hideError();
        registerBtn.disabled = false;
    }

    return new Promise((resolve, reject) => {
        registerBtn.onclick = function ()
        {
            let username = nameElem.value;
            let password = passElem.value;
            let password2 = passElem2.value;
            let email = emailElem.value;

            if (password != password2)
                return;

            dialog.close();
            resolve([username, password, email]);
        }

        dialog.on('enter', registerBtn.onclick);
    });
}