function isTokenType(types,offset){offset=offset||0;for(var i=0;i<types.length;i++){var token=getToken(i+offset);if(!token||token.type!==types[i])return!1}return!0}