async function getAndUpdateTemplate() {
  const config = admin.remoteConfig();
  try {
    // Get current active template.
    const template = await config.getTemplate();
    // Set "android_en" condition.
    template.conditions.push({
      name: 'android_en',
      expression: 'device.os == \'android\' && device.country in [\'us\', \'uk\']',
      tagColor: 'BLUE',
    });
    // Set "header_text" parameter.
    template.parameters['header_text'] = {
      defaultValue: {
        value: 'A Gryffindor must be brave, talented and helpful.'
      },
      conditionalValues: {
        android_en: {
          value: 'A Droid must be brave, talented and helpful.'
        },
      },
    };
    // Validate template after updating it.
    await config.validateTemplate(template);
    // Publish updated template.
    const updatedTemplate= await config.publishTemplate(template);
    console.log('Latest etag: ' + updatedTemplate.etag);
  } catch (err) {
    console.error('Unable to get and update template.');
    console.error(err);
  }
}