function publishTemplate() {
  const config = admin.remoteConfig();
  const template = config.createTemplateFromJSON(
      fs.readFileSync('config.json', 'utf-8'));
  config.publishTemplate(template)
      .then(updatedTemplate => {
        console.log('Template has been published');
        console.log('ETag from server: ' + updatedTemplate.etag);
      })
      .catch(err => {
        console.error('Unable to publish template.');
        console.error(err);
      });
}