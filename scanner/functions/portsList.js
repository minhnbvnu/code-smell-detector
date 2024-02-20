function portsList(ports) {
        const portsExp = ports.split(",");
        let portsArr = [];
        for (s of portsExp) {
            if (s.includes("-")) {
                const r = s.split("-")
                const r0 = parseInt(r[0], 10);
                const r1 = parseInt(r[1], 10) + 1;
                for (let i = r0; i < r1; i++) {
                    portsArr.push(i);
                }
            } else {
                portsArr.push(s);

            }
        }
        return portsArr;
    }