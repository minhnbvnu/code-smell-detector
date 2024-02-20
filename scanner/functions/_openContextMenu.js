function _openContextMenu (tableComp) {
  tableComp._onContextMenu(new DOMEvent({ clientY: 0, clientX: 0 }))
  return tableComp.find('.sc-context-menu')
}