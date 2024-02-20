function makeErrorCtor(errorName, protoParent)
{
    // Get the global this value
    var globalThis = this;

    // Error constructor function
    function ErrorCtor(message)
    {
        if (this === globalThis)
            var newObj = new ErrorCtor(message);
        else
            var newObj = this;

        if (message !== undefined)
            this.message = message.toString();

        return newObj;
    }

    // Create the prototype object for this error constructor
    ErrorCtor.prototype = Object.create(protoParent);

    // Set the error name in the error prototype object
    ErrorCtor.prototype.name = errorName;

    // The default error message is the empty string
    ErrorCtor.prototype.message = '';

    // Set the prototype constructor to the error constructor
    ErrorCtor.prototype.constructor = ErrorCtor;

    // Return the new error constructor function
    return ErrorCtor;
}