async function installPackage(runtime, codeUri, pkgType, pkgName, options) {

  const ctx = await new Context(runtime, codeUri);
  
  try {
    switch (pkgType) {

    case 'apt':
      await new AptTask(options.name, runtime, codeUri, 
        pkgName, options.local, null, options.env, ctx, options.verbose).run();
      break;
    case 'pip':
      await new PipTask(options.name, runtime, codeUri, 
        pkgName, options.local, null, options.env, ctx, options.verbose).run();
      break;
    case 'module':
      // TODO
      break;
    default:
      throw new Error(`unknow package type %${options.packageType}`);
    }
  } finally {
    await ctx.teardown();
  }
}