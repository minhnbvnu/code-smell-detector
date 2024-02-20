function combinedShaderPartsWithCode(shaderPartsOrDescs, bodyCode) {
    let shaderPartDescs = shaderPartsOrDescs.map(partOrDesc => partOrDesc instanceof ShaderPart ?
        new ShaderPartDescription(_ => partOrDesc, 'fixed') :
        partOrDesc);
    let sourceMaker = () => {
        let libs = new Set();
        for (let part of shaderPartDescs) {
            for (let lib of part.toConcretePart().libs) {
                libs.add(lib);
            }
        }
        let libCode = [...libs, ...shaderPartDescs.map(e => e.toConcretePart().code)].join('');
        let afterLibCode = '\n//////// body ////////\n' + bodyCode + '\n';

        // HACK: workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=764036
        let mainIndex = libCode.indexOf('void main()');
        if (mainIndex !== -1) {
          return libCode.substring(0, mainIndex) + afterLibCode + libCode.substring(mainIndex);
        }

        return libCode + afterLibCode;
    };

    return new WglShader(sourceMaker);
}