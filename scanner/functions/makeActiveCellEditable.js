function makeActiveCellEditable(e,o,t){if(activeCellNode){if(!options.editable)throw new Error("SlickGrid makeActiveCellEditable : should never get called when options.editable is false");if(clearTimeout(h_editorLoader),isCellPotentiallyEditable(activeRow,activeCell)){var n=columns[activeCell],l=getDataItem(activeRow);if(!1!==trigger(self.onBeforeEditCell,{row:activeRow,cell:activeCell,item:l,column:n,target:"grid"})){getEditorLock().activate(editController),$(activeCellNode).addClass("editable");var r=e||getEditor(activeRow,activeCell);e||r.suppressClearOnEdit||(activeCellNode.innerHTML="");var i=data.getItemMetadata&&data.getItemMetadata(activeRow),a=(i=i&&i.columns)&&(i[n.id]||i[activeCell]);currentEditor=new r({grid:self,gridPosition:absBox($container[0]),position:absBox(activeCellNode),container:activeCellNode,column:n,columnMetaData:a,item:l||{},event:t,commitChanges:commitEditAndSetFocus,cancelChanges:cancelEditAndSetFocus}),l&&(currentEditor.loadValue(l),o&&currentEditor.preClick&&currentEditor.preClick()),serializedEditorValue=currentEditor.serializeValue(),currentEditor.position&&handleActiveCellPositionChange()}else setFocus()}}}