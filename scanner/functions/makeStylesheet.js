function makeStylesheet(id) {
  let prefix = 'ember-inspector';

  return `
    #${prefix}-highlight-${id} {
      display: none;
      pointer-events: none;
      box-sizing: border-box;
      position: absolute;
      margin: 0px;
      padding: 0px;
      border: none;
      z-index: 1000000;
      /* https://github.com/ChromeDevTools/devtools-frontend/blob/b336f0440a8fb539352ac223ef466c3475618cf1/front_end/common/Color.js#L904 */
      background: rgba(111, 168, 220, .66);
    }

    #${prefix}-tooltip-${id} {
      display: none;
      box-sizing: border-box;
      position: absolute;
      margin: 8px 0px;
      padding: 4px 8px;
      border: none;
      border-radius: 3px;
      z-index: 1000000;
      font-family: sans-serif;
      font-size: 12px;
      font-weight: normal;
      background: white;
      box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.25);
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-header {
      display: block;
      margin: 4px 0px;
      padding: 0px;
      border: none;
      font-family: sans-serif;
      font-size: 12px;
      font-weight: normal;
      background: transparent;
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-title {
      font-weight: bold;
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-token-tag,
    #${prefix}-tooltip-${id} .${prefix}-tooltip-token-namespace {
      /* https://github.com/ChromeDevTools/devtools-frontend/blob/103326238685ac582d3bf2a02f1627a80e3fce5f/front_end/ui/inspectorSyntaxHighlight.css#L69-L71 */
      color: rgb(168, 148, 166);
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-token-name {
      /* https://github.com/ChromeDevTools/devtools-frontend/blob/103326238685ac582d3bf2a02f1627a80e3fce5f/front_end/ui/inspectorSyntaxHighlight.css#L60 */
      color: rgb(136, 18, 128);
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-token-id {
      /* https://github.com/ChromeDevTools/devtools-frontend/blob/103326238685ac582d3bf2a02f1627a80e3fce5f/front_end/ui/inspectorSyntaxHighlight.css#L109-L113 */
      color: rgb(26, 26, 166);
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-details {
      display: table;
      table-layout: auto;
      width: auto;
      height: auto;
      margin: 0px;
      padding: 0px;
      border: none;
      border-spacing: 0px;
      border-collapse: collapse;
      background: transparent;
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-details tbody {
      display: table-row-group;
      vertical-align: middle;
      width: auto;
      height: auto;
      margin: 0px;
      padding: 0px;
      border: none;
      border-spacing: 0px;
      border-collapse: collapse;
      background: transparent;
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-details tr {
      display: table-row;
      vertical-align: middle;
      width: auto;
      height: auto;
      margin: 0px;
      padding: 0px;
      border: none;
      border-spacing: 0px;
      border-collapse: collapse;
      background: transparent;
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-details th {
      display: block;
      width: auto;
      height: auto;
      margin: 4px 8px 4px 0px;
      padding: 0px;
      border: none;
      border-spacing: 0px;
      border-collapse: collapse;
      white-space: nowrap;
      font-family: sans-serif;
      font-size: 12px;
      font-weight: normal;
      text-align: left;
      color: #666;
      background: transparent;
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-details td {
      display: table-cell;
      width: auto;
      height: auto;
      margin: 0px;
      padding: 0px;
      border: none;
      border-spacing: 0px;
      border-collapse: collapse;
      font-family: sans-serif;
      font-size: 12px;
      font-weight: normal;
      text-align: right;
      color: #000;
      background: transparent;
      max-width: 400px;
      word-wrap: break-word;
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-arrow {
      display: block;
      box-sizing: border-box;
      position: absolute;
      top: auto;
      right: auto;
      bottom: -20px;
      left: 0px;
      width: 40px;
      height: 20px;
      margin: 0px 0px 0px -20px;
      padding: 0px;
      border: none;
      background: transparent;
      overflow-x: visible;
      overflow-y: hidden;
    }

    #${prefix}-tooltip-${id}.${prefix}-tooltip-attach-below .${prefix}-tooltip-arrow {
      top: -20px;
      bottom: auto;
      transform: rotate(180deg);
    }

    #${prefix}-tooltip-${id} .${prefix}-tooltip-arrow::after {
      content: "";
      display: block;
      box-sizing: border-box;
      position: absolute;
      top: 0px;
      right: auto;
      bottom: auto;
      left: 50%;
      width: 0px;
      height: 0px;
      margin: 0px 0px 0px -8px;
      border: 6px solid white;
      border-color: transparent transparent white white;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
      transform-origin: 0 0;
      transform: rotate(-45deg);
    }
  `;
}