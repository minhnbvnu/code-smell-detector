function WebParse (ua) {
  const d = detector.parse(ua);

  const ieCore = IEMode(ua);

  // IE 内核的浏览器，修复版本号及兼容模式。
  if(ieCore) {
    const engineName = d.engine.name;
    const engineVersion = ieCore.engineVersion || ieCore.engineMode;
    const ve = parseFloat(engineVersion);
    const engineMode = ieCore.engineMode;

    d.engine = {
      name: engineName,
      version: ve,
      fullVersion: engineVersion,
      mode: parseFloat(engineMode),
      fullMode: engineMode,
      compatible: ieCore ? ieCore.compatible : false,
    };
    d.engine[d.engine.name] = ve;

    const browserName = d.browser.name;
    // IE 内核的浏览器，修复浏览器版本及兼容模式。
    // 仅修改 IE 浏览器的版本，其他 IE 内核的版本不修改。
    let browserVersion = d.browser.fullVersion;
    if(browserName === "ie"){
      browserVersion = ieCore.browserVersion;
    }
    const browserMode = ieCore.browserMode;
    const vb = parseFloat(browserVersion);
    d.browser = {
      name: browserName,
      version: vb,
      fullVersion: browserVersion,
      mode: parseFloat(browserMode),
      fullMode: browserMode,
      compatible: ieCore ? ieCore.compatible : false,
    };
    d.browser[browserName] = vb;
  }
  return d;
}