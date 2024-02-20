function newAjvDraft4() {
  const ajv = new Ajv({
    meta: false, // Prevent loading future schemas
    schemaId: 'id', // needed because we use 'id' in draft-04
    extendRefs: 'fail' // Be more strict, don't allow ref extension
  });

  const metaSchema = require('ajv/lib/refs/json-schema-draft-04.json');
  ajv.addMetaSchema(metaSchema);
  ajv._opts.defaultMeta = metaSchema.id;

  // Disable keywords defined in future drafts
  ajv.removeKeyword('propertyNames');
  ajv.removeKeyword('contains');
  ajv.removeKeyword('const');

  return ajv;
}