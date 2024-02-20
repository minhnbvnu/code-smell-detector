function hardhatSetupEnv(mocha) {
  const mockwd = path.join(process.cwd(), temp);
  previousCWD = process.cwd();
  process.chdir(mockwd);
  mocha.env = require("hardhat");
  mocha.env.config.logger = testLogger
  mocha.logger = testLogger
}