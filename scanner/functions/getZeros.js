function getZeros(/** @type {number} */ count) {
            const sb = [":"];
            while (count > 0) {
                sb.push("0000:");
                count--;
            }
            return sb.join("");
        }