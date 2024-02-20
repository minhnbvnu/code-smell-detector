function ChatGPTAPI(opts) {
        var apiKey = opts.apiKey, apiOrg = opts.apiOrg, _a = opts.apiBaseUrl, apiBaseUrl = _a === void 0 ? 'https://api.openai.com/v1' : _a, _b = opts.debug, debug = _b === void 0 ? false : _b, messageStore = opts.messageStore, completionParams = opts.completionParams, systemMessage = opts.systemMessage, _c = opts.maxModelTokens, maxModelTokens = _c === void 0 ? 4000 : _c, _d = opts.maxResponseTokens, maxResponseTokens = _d === void 0 ? 1000 : _d, getMessageById = opts.getMessageById, upsertMessage = opts.upsertMessage, _e = opts.fetch, fetch = _e === void 0 ? globalFetch : _e;
        this._apiKey = apiKey;
        this._apiOrg = apiOrg;
        this._apiBaseUrl = apiBaseUrl;
        this._debug = !!debug;
        this._fetch = fetch;
        this._completionParams = __assign({ model: CHATGPT_MODEL, temperature: 0.8, top_p: 1.0, presence_penalty: 1.0 }, completionParams);
        this._systemMessage = systemMessage;
        if (this._systemMessage === undefined) {
            var currentDate = new Date().toISOString().split('T')[0];
            this._systemMessage = "You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.\nKnowledge cutoff: 2021-09-01\nCurrent date: ".concat(currentDate);
        }
        this._maxModelTokens = maxModelTokens;
        this._maxResponseTokens = maxResponseTokens;
        this._getMessageById = getMessageById !== null && getMessageById !== void 0 ? getMessageById : this._defaultGetMessageById;
        this._upsertMessage = upsertMessage !== null && upsertMessage !== void 0 ? upsertMessage : this._defaultUpsertMessage;
        if (messageStore) {
            this._messageStore = messageStore;
        }
        else {
            this._messageStore = new Keyv({
                store: new QuickLRU({ maxSize: 10000 })
            });
        }
        if (!this._apiKey) {
            throw new Error('OpenAI missing required apiKey');
        }
        if (!this._fetch) {
            throw new Error('Invalid environment; fetch is not defined');
        }
        if (typeof this._fetch !== 'function') {
            throw new Error('Invalid "fetch" is not a function');
        }
    }