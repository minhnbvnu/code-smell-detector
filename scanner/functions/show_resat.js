function show_resat(data) {
        if (data['firstName'] === undefined)
            document.getElementById('firstNameError').innerHTML = '';
        if (data['lastName'] === undefined)
            document.getElementById('lastNameError').innerHTML = '';
        if (data['userName'] === undefined)
            document.getElementById('userNameError').innerHTML = '';
        if (data['email'] === undefined)
            document.getElementById('emailError').innerHTML = '';
        if (data['password'] === undefined)
            document.getElementById('passwordError').innerHTML = '';
        if (data['phone'] === undefined)
            document.getElementById('phoneError').innerHTML = '';
        if (data['passwordConfirmation'] === undefined)
            document.getElementById('passwordConfirmationError').innerHTML = '';
    }