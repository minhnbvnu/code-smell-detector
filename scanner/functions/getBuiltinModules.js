function getBuiltinModules() {
                /*
                 * This list is generated using:
                 * `require("repl")._builtinLibs.concat('repl').sort()`
                 * This particular list is as per nodejs v0.12.2 and iojs v0.7.1
                 */
                return [
                    "assert", "buffer", "child_process", "cluster", "crypto",
                    "dgram", "dns", "domain", "events", "fs", "http", "https",
                    "net", "os", "path", "punycode", "querystring", "readline",
                    "repl", "smalloc", "stream", "string_decoder", "tls", "tty",
                    "url", "util", "v8", "vm", "zlib"
                ];
            }