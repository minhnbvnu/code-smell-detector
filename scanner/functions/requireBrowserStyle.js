function requireBrowserStyle() {
    if (process.env.PLATFORM === 'browser') require('./index.less')
}