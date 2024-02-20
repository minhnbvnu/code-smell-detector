async function getSwagger(apiDefinition, tplPath) {
  const props = apiDefinition.Properties;
  if (props) {
    if (props.DefinitionBody) {
      return props.DefinitionBody;
    } else if (props.DefinitionUri) {
      var swaggerPath;
      if (path.isAbsolute(props.DefinitionUri)) {
        swaggerPath = props.DefinitionUri;
      } else {
        swaggerPath = path.join(path.dirname(tplPath), props.DefinitionUri);
      }
      const swaggerContent = await fs.readFile(swaggerPath, 'utf8');
      return yaml.safeLoad(swaggerContent);
    }
  } else {
    return null;
  }
}