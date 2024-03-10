function ButtonIcon_ButtonIcon({
  className = '',
  type
}) {
  let pathData = null;

  switch (type) {
    case 'add':
      pathData = PATH_ADD;
      break;

    case 'cancel':
      pathData = PATH_CANCEL;
      break;

    case 'clear':
      pathData = PATH_CLEAR;
      break;

    case 'close':
      pathData = PATH_CLOSE;
      break;

    case 'collapsed':
      pathData = PATH_COLLAPSED;
      break;

    case 'copy':
      pathData = ButtonIcon_PATH_COPY;
      break;

    case 'delete':
      pathData = PATH_DELETE;
      break;

    case 'down':
      pathData = PATH_DOWN;
      break;

    case 'editor':
      pathData = PATH_EDITOR;
      break;

    case 'expanded':
      pathData = PATH_EXPANDED;
      break;

    case 'export':
      pathData = PATH_EXPORT;
      break;

    case 'filter':
      pathData = PATH_FILTER;
      break;

    case 'import':
      pathData = PATH_IMPORT;
      break;

    case 'log-data':
      pathData = PATH_LOG_DATA;
      break;

    case 'more':
      pathData = PATH_MORE;
      break;

    case 'next':
      pathData = PATH_NEXT;
      break;

    case 'parse-hook-names':
      pathData = PATH_PARSE_HOOK_NAMES;
      break;

    case 'previous':
      pathData = PATH_PREVIOUS;
      break;

    case 'record':
      pathData = PATH_RECORD;
      break;

    case 'reload':
      pathData = PATH_RELOAD;
      break;

    case 'save':
      pathData = PATH_SAVE;
      break;

    case 'search':
      pathData = ButtonIcon_PATH_SEARCH;
      break;

    case 'settings':
      pathData = ButtonIcon_PATH_SETTINGS;
      break;

    case 'error':
      pathData = ButtonIcon_PATH_ERROR;
      break;

    case 'suspend':
      pathData = PATH_SUSPEND;
      break;

    case 'undo':
      pathData = PATH_UNDO;
      break;

    case 'up':
      pathData = PATH_UP;
      break;

    case 'view-dom':
      pathData = PATH_VIEW_DOM;
      break;

    case 'view-source':
      pathData = PATH_VIEW_SOURCE;
      break;

    default:
      console.warn(`Unsupported type "${type}" specified for ButtonIcon`);
      break;
  }

  return /*#__PURE__*/react["createElement"]("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: `${ButtonIcon_default.a.ButtonIcon} ${className}`,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react["createElement"]("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), typeof pathData === 'string' ? /*#__PURE__*/react["createElement"]("path", {
    fill: "currentColor",
    d: pathData
  }) : pathData);
}