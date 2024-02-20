function createHtmlFunction (source, scope, config) {
  // Templating functions for universal rendering (SSR+CSR)
  const [unHeadSource, unFooterSource] = source.split('<!-- element -->')
  const unHeadTemplate = createHtmlTemplateFunction(unHeadSource)
  const unFooterTemplate = createHtmlTemplateFunction(unFooterSource)
  // Templating functions for server-only rendering (SSR only)
  const [soHeadSource, soFooterSource] = source
    // Unsafe if dealing with user-input, but safe here
    // where we control the index.html source
    .replace(/<script[^>]+type="module"[^>]+>.*?<\/script>/g, '')
    .split('<!-- element -->')
  const soHeadTemplate = createHtmlTemplateFunction(soHeadSource)
  const soFooterTemplate = createHtmlTemplateFunction(soFooterSource)
  // This function gets registered as reply.html()
  return function ({ routes, context, app }) {
    // Decide which templating functions to use, with and without hydration
    const headTemplate = context.serverOnly ? soHeadTemplate : unHeadTemplate
    const footerTemplate = context.serverOnly ? soFooterTemplate : unFooterTemplate
    // Render page-level <head> elements
    const head = new Head(context.head).render()
    const style = (
      app.style?.code && (
      `<style>\n${app.style.code}\n</style>`
      )
    ) || ''

    // Create readable stream with prepended and appended chunks
    const readable = Readable.from(generateHtmlStream({
      body: app.html,
      head: headTemplate({ 
        ...context, 
        style,
        head, 
      }),
      footer: () => footerTemplate({
        ...context,
        hydration: '',
        // Decide whether or not to include the hydration script
        ...!context.serverOnly && {
          hydration: (
            '<script>\n' +
            `window.route = ${devalue(context.toJSON())}\n` +
            `window.routes = ${devalue(routes.toJSON())}\n` +
            '</script>'
          )
        }        
      }),
    }))
    // Send out header and readable stream with full response
    this.type('text/html')
    this.send(readable)
  }
}