function decompressABI(abi) {
    return JSON.parse(pako.inflate(Buffer.from(abi, 'base64'), {to: 'string'}));
}