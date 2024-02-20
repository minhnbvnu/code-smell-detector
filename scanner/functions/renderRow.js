function renderRow(row) {
    return (// The `role="presentation` attribute ensures that the list items are properly associated with the `VirtualList` element
      // We use the first file ID as the key—this should not change across scroll rerenders
      h("div", {
        role: "presentation",
        key: row[0]
      }, row.map(function (fileID) {
        return h(FileItem, _extends({
          key: fileID
        }, fileProps, {
          role: "listitem",
          openFileEditor: props.openFileEditor,
          canEditFile: props.canEditFile,
          file: props.files[fileID]
        }));
      }))
    );
  }