function deserializeIncompatiblePackagesComponent() {
  const IncompatiblePackagesComponent = require('./incompatible-packages-component');
  return new IncompatiblePackagesComponent(atom.packages);
}