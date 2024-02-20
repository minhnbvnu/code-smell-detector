function showBuildWarning() {
  console.log('\n');
  console.log('********************************************************************************');
  // eslint-disable-next-line max-len
  console.log('Appmetrics uses node-gyp to compile and build local binary libraries to enhance execution performance. If the following compilation and build logs contain errors, make sure you have the node-gyp pre-requisites installed \(https://github.com/nodejs/node-gyp#installation). If you have them and the build still had errors, see if there are any related issues at https://github.com/RuntimeTools/appmetrics/issues). If there aren\'t, feel free to open a new issue to report the bug.');
  console.log('********************************************************************************');
  console.log('\n');
}