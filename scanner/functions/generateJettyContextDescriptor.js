async function generateJettyContextDescriptor(warfilePath) {
  const xmlContent = `<?xml version="1.0"  encoding="ISO-8859-1"?>
<!DOCTYPE Configure PUBLIC "-//Mort Bay Consulting//DTD Configure//EN" 
  "http://www.eclipse.org/jetty/configure.dtd">
<Configure class="org.eclipse.jetty.webapp.WebAppContext">
    <Set name="contextPath">/</Set>
    <Set name="war">${path.resolve('/code', warfilePath)}</Set>
    <Set name="extraClasspath">/mnt/auto/java/*</Set>
</Configure>  
`;
  const descriptorPath = path.join(path.dirname(warfilePath), 'context.xml');
  await fs.writeFile(descriptorPath, xmlContent);
  return path.resolve('/code', descriptorPath);
}