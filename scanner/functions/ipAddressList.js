function ipAddressList(ipAddressSpec) {
        const targetExp = ipAddressSpec.split(",");
        let final = [];

        for (s of targetExp) {
            // Do we have a cname
            // TKTK implement better check.
            if (s.match(/[a-z]/i)) {
                final.push(s);
                continue;
            };

            const arr = s.split(".")
            let j = 0
            let temp = [
                [],
                [],
                [],
                []
            ];
            for (a of arr) {
                if (a.includes("-")) {
                    const r = a.split("-")
                    const r0 = parseInt(r[0], 10);
                    const r1 = parseInt(r[1], 10) + 1;
                    for (let i = r0; i < r1; i++) {
                        temp[j].push(i);
                    }

                } else {
                    temp[j].push(a);

                }
                j += 1;
            }
            let final_temp = cartesian(temp[0], temp[1], temp[2], temp[3])
            for (s of final_temp) {
                final.push(s.join("."))
            }
        }
        return final;
    }