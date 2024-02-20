function detectAddOn() {
    let NodeNativeTry;
    let cpuSupport = 'native';
    try {
        NodeNativeTry = require('bindings')(`nimiq_node_${cpuSupport}.node`);
    } catch (e) {
        cpuSupport = undefined;
    }

    // Use CPUID to get the available processor extensions
    // and choose the right version of the node.js addon
    cpuSupport = cpuSupport || function() {
        try {
            const cpu = cpuid();
            return ['avx512f', 'avx2', 'avx', 'sse2'].find(f => cpu.features[f]) || 'compat';
        } catch (e) {
            return 'compat';
        }
    }();

    let NodeNative = NodeNativeTry || require('bindings')(`nimiq_node_${cpuSupport}.node`);

    return {NodeNative, cpuSupport};
}