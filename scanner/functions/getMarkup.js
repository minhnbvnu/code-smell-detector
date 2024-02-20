function getMarkup(options, data) {
    require('babel-core/register')({
        extensions: [
            '.jsx',
        ],
        ignore: false,
        plugins: [
            path.resolve(__dirname, '../node_modules/babel-plugin-transform-react-jsx'),
        ],
    })
    var actions = require('flatmarket-ui').actions
    var Component = require(options.component)
    var Provider = require('react-redux').Provider
    var React = require('react')
    var ReactDom = require('react-dom/server')
    var connect = require('flatmarket-ui').connect
    var store = require('flatmarket-ui').store
    var provider = React.createElement(Provider, { store: store }, React.createElement(connect(Component)))
    store.dispatch(actions.reset(data))
    return ReactDom.renderToStaticMarkup(provider)
}