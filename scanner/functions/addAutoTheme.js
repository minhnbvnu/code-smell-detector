function addAutoTheme(rootPath) {
  const style = document.createElement('link');
  style.rel = "stylesheet";
  style.type = "text/css";
  style.href = `${rootPath}/css/theme.css`;
  document.documentElement.appendChild(style)
}