function sanitizeFunctionCall(tokens,start){var parenDepth=1,end=start+1,n=tokens.length;while(end<n&&parenDepth){var token=tokens[end++];parenDepth+=token===")"?-1:/^[^"']*\($/.test(token)}if(!parenDepth){var fnToken=tokens[start].toLowerCase();var bareFnToken=withoutVendorPrefix(fnToken);var fnTokens=tokens.splice(start,end-start,"");var fns=propertySchema["cssFns"];for(var i=0,nFns=fns.length;i<nFns;++i){if(fns[i].substring(0,bareFnToken.length)==bareFnToken){fnTokens[0]=fnTokens[fnTokens.length-1]="";sanitize(fns[i],fnTokens,opt_naiveUriRewriter,opt_baseUri);return fnToken+fnTokens.join(" ")+")"}}}return""}