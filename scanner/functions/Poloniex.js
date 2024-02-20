function Poloniex(key, secret){
        // Generate headers signed by this user's key and secret.
        // The secret is encapsulated and never exposed
        this._getPrivateHeaders = function(parameters){
            var paramString, signature;

            if (!key || !secret){
                throw 'Poloniex: Error. API key and secret required';
            }

            // Sort parameters alphabetically and convert to `arg1=foo&arg2=bar`
            paramString = Object.keys(parameters).sort().map(function(param){
                return encodeURIComponent(param) + '=' + encodeURIComponent(parameters[param]);
            }).join('&');

            signature = crypto.createHmac('sha512', secret).update(paramString).digest('hex');

            return {
                Key: key,
                Sign: signature
            };
        };
    }