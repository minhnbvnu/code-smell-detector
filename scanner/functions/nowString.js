function nowString() {
            const d = /* @__PURE__ */ new Date();
            return `${padLeft(d.getHours().toString(), 2, "0")}:${padLeft(d.getMinutes().toString(), 2, "0")}:${padLeft(d.getSeconds().toString(), 2, "0")}.${padLeft(d.getMilliseconds().toString(), 3, "0")}`;
        }