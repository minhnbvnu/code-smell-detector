function channelSamplerDeclaration(num) {
    return `uniform sampler2D ${channelSamplerName(num)};`;
}