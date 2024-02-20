function createExporter(exports, previous) {
            if (exports !== root) {
                if (typeof Object.create === "function") {
                    Object.defineProperty(exports, "__esModule", { value: true });
                }
                else {
                    exports.__esModule = true;
                }
            }
            return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
        }