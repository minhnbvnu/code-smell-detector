function generatePingList(str) {
            return (str + "").split(",").map((e) => (e + "").trim()).filter((e) => e != "");
        }