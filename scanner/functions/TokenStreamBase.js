function TokenStreamBase(input, tokenData){
    this._reader = input ? new StringReader(input.toString()) : null;
    this._token = null;
    this._tokenData = tokenData;
    this._lt = [];
    this._ltIndex = 0;

    this._ltIndexCache = [];
}