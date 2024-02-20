async function getMyIpAddressesThenScan() {
    sm = ScanManager();
    let addrSpec = `127.0.0.1,0.0.0.0,`;
    const portSpec = document.getElementById("portspec").value;
    let externalAddress = await getMyExternalIpAddress();
    addrSpec = `${addrSpec}${externalAddress},`;

    getLocalIpAddress()
        .then(address => {
            const range = `${address.split('.', 3).join('.')}.1-254`;
            addrSpec = `${addrSpec}${range}`;
            document.getElementById("ipaddressspec").value = addrSpec;
            sm.run(addrSpec, portSpec, resultFn, doneFn);
        },
            e => {
                console.log(e);
                addrSpec = `${addrSpec}192.168.1.1-255`;
                document.getElementById("ipaddressspec").value = addrSpec;
                sm.run(addrSpec, portSpec, resultFn, doneFn);

            })
}