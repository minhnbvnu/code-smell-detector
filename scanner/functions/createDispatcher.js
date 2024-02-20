async function createDispatcher(options={}){

    // merge options
    const opt = _parseOptions(options);

    // load resources
    const resources = await _getResources(opt);

    // multi-type support
    // @see https://github.com/koajs/koa/blob/master/docs/api/response.md#responseistypes
    return function dispatchRequest(page, httpStatusCode, ctx, err){

        // run generic dispatcher
        const {pageData, templateVars} = _dispatch(opt, resources, page, httpStatusCode, err);

        // set http status code
        ctx.status = httpStatusCode || 500;

        // multiple response formats
        switch (ctx.accepts('json', 'html', 'text')){

            // jsonn response
            case 'json':
                ctx.type = 'json';
                ctx.body = {
                    error: `${pageData.title} - ${pageData.message}`
                }
                break;

            // html response
            case 'html':
                ctx.type = 'html';
                ctx.body = _render(resources.template, resources.stylesheet, opt.filter(templateVars, ctx));
                break;
            
            // default: text response
            default:
                ctx.type = 'text/plain';
                ctx.body = `${pageData.title} - ${pageData.message}`;
          }
    }
}