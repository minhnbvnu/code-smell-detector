function Icon_Icon({
  className = '',
  title = '',
  type
}) {
  let pathData = null;

  switch (type) {
    case 'arrow':
      pathData = PATH_ARROW;
      break;

    case 'bug':
      pathData = PATH_BUG;
      break;

    case 'code':
      pathData = PATH_CODE;
      break;

    case 'components':
      pathData = PATH_COMPONENTS;
      break;

    case 'copy':
      pathData = PATH_COPY;
      break;

    case 'error':
      pathData = PATH_ERROR;
      break;

    case 'facebook':
      pathData = PATH_FACEBOOK;
      break;

    case 'flame-chart':
      pathData = PATH_FLAME_CHART;
      break;

    case 'profiler':
      pathData = PATH_PROFILER;
      break;

    case 'ranked-chart':
      pathData = PATH_RANKED_CHART;
      break;

    case 'timeline':
      pathData = PATH_SCHEDULING_PROFILER;
      break;

    case 'search':
      pathData = PATH_SEARCH;
      break;

    case 'settings':
      pathData = PATH_SETTINGS;
      break;

    case 'store-as-global-variable':
      pathData = PATH_STORE_AS_GLOBAL_VARIABLE;
      break;

    case 'strict-mode-non-compliant':
      pathData = PATH_STRICT_MODE_NON_COMPLIANT;
      break;

    case 'warning':
      pathData = PATH_WARNING;
      break;

    default:
      console.warn(`Unsupported type "${type}" specified for Icon`);
      break;
  }

  return /*#__PURE__*/react["createElement"]("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: `${Icon_default.a.Icon} ${className}`,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, title && /*#__PURE__*/react["createElement"]("title", null, title), /*#__PURE__*/react["createElement"]("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "currentColor",
    d: pathData
  }));
}