function genChannelSampleSource(buf, coord) {
    return {
        sections: ["channel(", `, ${codebuilder_1.channelSamplerName(buf)})`],
        values: [coord],
    };
}