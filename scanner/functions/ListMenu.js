function ListMenu() {
  const removeAllTracks = useActionCreator(playlist_removeAllTracks);
  const addFilesFromList = useActionCreator(files_addFilesFromList);
  const saveFilesToList = useActionCreator(files_saveFilesToList);
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])(PlaylistWindow_PlaylistMenu, {
    id: "playlist-list-menu",
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "new-list",
      onClick: removeAllTracks
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "save-list",
      onClick: saveFilesToList
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "load-list",
      onClick: addFilesFromList
    })]
  });
}