function validateUserName(name)
{
    if (name.length < MIN_USERNAME_LENGTH)
    {
        throw TypeError('username too short');
    }

    if (name.length > MAX_USERNAME_LENGTH)
    {
        throw TypeError('username too long');
    }

    // Spaces and hyphens are only allowed in the middle of the username
    let regex = /^[a-zA-Z0-9_]+[a-zA-Z0-9_\- ]*[a-zA-Z0-9_]+$/;

    if (!name.match(regex))
    {
        throw TypeError('username contains invalid characters');
    }
}