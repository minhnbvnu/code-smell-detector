function getHardhatConfigJS(config){
  const prefix =`
    require("@nomiclabs/hardhat-truffle5");
    require(__dirname + "/../plugins/nomiclabs.plugin");

  `

  if (config) {
    return `${prefix}module.exports = ${JSON.stringify(config, null, ' ')}`;
  } else {
    return `${prefix}module.exports = ${JSON.stringify(getDefaultHardhatConfig(), null, ' ')}`;
  }
}