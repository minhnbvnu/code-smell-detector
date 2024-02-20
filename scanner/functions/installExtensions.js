async function installExtensions() {
  const installer = require("electron-devtools-installer");
  const forceDownload = true; // process.env.UPGRADE_EXTENSIONS
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];
  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload)),
  ).catch(console.log);
}