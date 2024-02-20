function removeUnderlineAndFontInAnchor(editor, root) {
      editor.$('a', root).find('font,u').each(function (i, node) {
        editor.dom.remove(node, true);
      });
    }