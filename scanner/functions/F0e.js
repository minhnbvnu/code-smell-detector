function F0e(e,t,r){if(typeof e=="string")throw(0,lv().newError)("Please pass PublishConfiguration object","ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");let i=e.provider;switch(i){case"github":{let a=e,n=(a.private?process.env.GH_TOKEN||process.env.GITHUB_TOKEN:null)||a.token;return n==null?new(_N()).GitHubProvider(a,t,r):new(CN()).PrivateGitHubProvider(a,t,n,r)}case"s3":case"spaces":return new(y9()).GenericProvider({provider:"generic",url:(0,lv().getS3LikeProviderBaseUrl)(e),channel:e.channel||null},t,er(Be({},r),{isUseMultipleRangeRequest:!1}));case"generic":{let a=e;return new(y9()).GenericProvider(a,t,er(Be({},r),{isUseMultipleRangeRequest:a.useMultipleRangeRequest!==!1&&DN(a.url)}))}case"bintray":return new(EN()).BintrayProvider(e,r);default:throw(0,lv().newError)(`Unsupported provider: ${i}`,"ERR_UPDATER_UNSUPPORTED_PROVIDER")}}