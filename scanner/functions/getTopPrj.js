function getTopPrj(geo) {
            const prjs = geo._getPrjShell();
            let topPrj = prjs[0];
            for (let i = 0, len = prjs.length; i < len; i++) {
                const { x, y } = prjs[i];
                if (y > topPrj.y) {
                    topPrj = prjs[i];
                }
            }
            return topPrj;
        }