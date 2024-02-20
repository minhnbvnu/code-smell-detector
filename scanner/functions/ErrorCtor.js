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