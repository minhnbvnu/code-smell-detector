function writeConfig(next) {
  fs.writeFile(targetConfig , JSON.stringify(sparseConfig, null, 2), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log("\nConfig written to : " + targetConfig + "\n");
      console.log("IMPORTANT : Ensure to remember your API password\n");
      console.log("RabbitMQ may need additional configuration.  Check the 'rabbit' section in the config file.\n");
      console.log("To start bipio server : node ./src/server.js - the REST API will be listening at http://" + sparseConfig.domain_public + "\n");
      console.log('See docs at https://github.com/bipio-server/bipio for more information.');
      next();
    }
  });
}