function removeExplorerBrElementsAfterBlocks(editor, html) {
      if (!isWordContent(html)) {
        return html;
      }
      var blockElements = [];
      global$4.each(editor.schema.getBlockElements(), function (block, blockName) {
        blockElements.push(blockName);
      });
      var explorerBlocksRegExp = new RegExp('(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*(<\\/?(' + blockElements.join('|') + ')[^>]*>)(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*', 'g');
      html = filter$1(html, [[
          explorerBlocksRegExp,
          '$1'
        ]]);
      html = filter$1(html, [
        [
          /<br><br>/g,
          '<BR><BR>'
        ],
        [
          /<br>/g,
          ' '
        ],
        [
          /<BR><BR>/g,
          '<br>'
        ]
      ]);
      return html;
    }