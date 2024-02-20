function getNetworkIp() {
    // 打开的host
    let needHost = '';
    try {
        // 获得网络接口列表
        const network = os.networkInterfaces();
        for (const dev in network) {
            const iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                const alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    }
    catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}