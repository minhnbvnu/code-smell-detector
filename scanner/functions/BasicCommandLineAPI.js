function BasicCommandLineAPI(callFrame)
{
    this.$_ = injectedScript._lastResult;
    this.$exception = injectedScript._exceptionValue;

    // $1-$99
    for (let i = 1; i <= injectedScript._savedResults.length; ++i)
        this.__defineGetter__("$" + i, bind(injectedScript._savedResult, injectedScript, i));

    // Command Line API methods.
    for (let method of BasicCommandLineAPI.methods)
        this[method.name] = method;
}