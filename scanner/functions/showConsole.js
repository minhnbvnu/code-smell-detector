function showConsole(mapfile) {
    var style =
        '#seajs-debug-console { ' +
        '  position: fixed; bottom: 10px; ' +
        '  *position: absolute; *top: 10px; *width: 465px; ' +
        '  right: 10px; z-index: 999999999;' +
        '  background: #fff; color: #000; font: 12px arial;' +
        '  border: 2px solid #000; padding: 0 10px 10px;' +
        '}' +
        '#seajs-debug-console h3 {' +
        '  margin: 3px 0 6px -6px; padding: 0;' +
        '  font-weight: bold; font-size: 14px;' +
        '}' +
        '#seajs-debug-console input {' +
        '  width: 400px; margin-left: 10px;' +
        '}' +
        '#seajs-debug-console button {' +
        '  float: right; margin: 6px 0 0 10px;' +
        '  box-shadow: #ddd 0 1px 2px;' +
        '  font-size: 14px; padding: 4px 10px;' +
        '  color: #211922; background: #f9f9f9;' +
        '  text-shadow: 0 1px #eaeaea;' +
        '  border: 1px solid #bbb; border-radius: 3px;' +
        '  cursor: pointer; opacity: .8' +
        '}' +
        '#seajs-debug-console button:hover {' +
        '  background: #e8e8e8; text-shadow: none; opacity: 1' +
        '}' +
        '#seajs-debug-console a {' +
        '  position: relative; top: 10px; text-decoration: none;' +
        '}'

    var html =
        '<div id="seajs-debug-console">' +
        '  <h3>SeaJS Debug Console</h3>' +
        '  <label>Map file: <input value="' + mapfile + '"/></label><br/>' +
        '  <button>Exit</button>' +
        '  <button>Hide</button>' +
        '  <button>Refresh</button>' +
        '</div>'

    var div = document.createElement('div')
    div.innerHTML = html

    seajs.importStyle(style)
    appendToBody(div)

    var buttons = div.getElementsByTagName('button')

    // hide
    buttons[1].onclick = function() {
      config.console = 0
      saveConfig(config)
      loc.replace(loc.href.replace(/(?:\?|&)seajs-debug/, ''))
    }

    // refresh
    buttons[2].onclick = function() {
      var link = div.getElementsByTagName('input')[0].value || ''
      if (link) {
        link = util.id2Uri(link)
      }

      config.mapfile = link
      saveConfig(config)
      loc.reload()
    }

    // exit debug mode
    buttons[0].onclick = function() {
      config.debug = 0
      saveConfig(config)
      loc.replace(loc.href.replace(/(?:\?|&)seajs-debug/, ''))
    }
  }