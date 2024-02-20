function getScriptTargetFeatures() {
            return new Map(Object.entries({
                Array: new Map(Object.entries({
                    es2015: [
                        "find",
                        "findIndex",
                        "fill",
                        "copyWithin",
                        "entries",
                        "keys",
                        "values"
                    ],
                    es2016: [
                        "includes"
                    ],
                    es2019: [
                        "flat",
                        "flatMap"
                    ],
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                Iterator: new Map(Object.entries({
                    es2015: emptyArray
                })),
                AsyncIterator: new Map(Object.entries({
                    es2015: emptyArray
                })),
                Atomics: new Map(Object.entries({
                    es2017: emptyArray
                })),
                SharedArrayBuffer: new Map(Object.entries({
                    es2017: emptyArray
                })),
                AsyncIterable: new Map(Object.entries({
                    es2018: emptyArray
                })),
                AsyncIterableIterator: new Map(Object.entries({
                    es2018: emptyArray
                })),
                AsyncGenerator: new Map(Object.entries({
                    es2018: emptyArray
                })),
                AsyncGeneratorFunction: new Map(Object.entries({
                    es2018: emptyArray
                })),
                RegExp: new Map(Object.entries({
                    es2015: [
                        "flags",
                        "sticky",
                        "unicode"
                    ],
                    es2018: [
                        "dotAll"
                    ]
                })),
                Reflect: new Map(Object.entries({
                    es2015: [
                        "apply",
                        "construct",
                        "defineProperty",
                        "deleteProperty",
                        "get",
                        " getOwnPropertyDescriptor",
                        "getPrototypeOf",
                        "has",
                        "isExtensible",
                        "ownKeys",
                        "preventExtensions",
                        "set",
                        "setPrototypeOf"
                    ]
                })),
                ArrayConstructor: new Map(Object.entries({
                    es2015: [
                        "from",
                        "of"
                    ]
                })),
                ObjectConstructor: new Map(Object.entries({
                    es2015: [
                        "assign",
                        "getOwnPropertySymbols",
                        "keys",
                        "is",
                        "setPrototypeOf"
                    ],
                    es2017: [
                        "values",
                        "entries",
                        "getOwnPropertyDescriptors"
                    ],
                    es2019: [
                        "fromEntries"
                    ],
                    es2022: [
                        "hasOwn"
                    ]
                })),
                NumberConstructor: new Map(Object.entries({
                    es2015: [
                        "isFinite",
                        "isInteger",
                        "isNaN",
                        "isSafeInteger",
                        "parseFloat",
                        "parseInt"
                    ]
                })),
                Math: new Map(Object.entries({
                    es2015: [
                        "clz32",
                        "imul",
                        "sign",
                        "log10",
                        "log2",
                        "log1p",
                        "expm1",
                        "cosh",
                        "sinh",
                        "tanh",
                        "acosh",
                        "asinh",
                        "atanh",
                        "hypot",
                        "trunc",
                        "fround",
                        "cbrt"
                    ]
                })),
                Map: new Map(Object.entries({
                    es2015: [
                        "entries",
                        "keys",
                        "values"
                    ]
                })),
                Set: new Map(Object.entries({
                    es2015: [
                        "entries",
                        "keys",
                        "values"
                    ]
                })),
                PromiseConstructor: new Map(Object.entries({
                    es2015: [
                        "all",
                        "race",
                        "reject",
                        "resolve"
                    ],
                    es2020: [
                        "allSettled"
                    ],
                    es2021: [
                        "any"
                    ]
                })),
                Symbol: new Map(Object.entries({
                    es2015: [
                        "for",
                        "keyFor"
                    ],
                    es2019: [
                        "description"
                    ]
                })),
                WeakMap: new Map(Object.entries({
                    es2015: [
                        "entries",
                        "keys",
                        "values"
                    ]
                })),
                WeakSet: new Map(Object.entries({
                    es2015: [
                        "entries",
                        "keys",
                        "values"
                    ]
                })),
                String: new Map(Object.entries({
                    es2015: [
                        "codePointAt",
                        "includes",
                        "endsWith",
                        "normalize",
                        "repeat",
                        "startsWith",
                        "anchor",
                        "big",
                        "blink",
                        "bold",
                        "fixed",
                        "fontcolor",
                        "fontsize",
                        "italics",
                        "link",
                        "small",
                        "strike",
                        "sub",
                        "sup"
                    ],
                    es2017: [
                        "padStart",
                        "padEnd"
                    ],
                    es2019: [
                        "trimStart",
                        "trimEnd",
                        "trimLeft",
                        "trimRight"
                    ],
                    es2020: [
                        "matchAll"
                    ],
                    es2021: [
                        "replaceAll"
                    ],
                    es2022: [
                        "at"
                    ]
                })),
                StringConstructor: new Map(Object.entries({
                    es2015: [
                        "fromCodePoint",
                        "raw"
                    ]
                })),
                DateTimeFormat: new Map(Object.entries({
                    es2017: [
                        "formatToParts"
                    ]
                })),
                Promise: new Map(Object.entries({
                    es2015: emptyArray,
                    es2018: [
                        "finally"
                    ]
                })),
                RegExpMatchArray: new Map(Object.entries({
                    es2018: [
                        "groups"
                    ]
                })),
                RegExpExecArray: new Map(Object.entries({
                    es2018: [
                        "groups"
                    ]
                })),
                Intl: new Map(Object.entries({
                    es2018: [
                        "PluralRules"
                    ]
                })),
                NumberFormat: new Map(Object.entries({
                    es2018: [
                        "formatToParts"
                    ]
                })),
                SymbolConstructor: new Map(Object.entries({
                    es2020: [
                        "matchAll"
                    ]
                })),
                DataView: new Map(Object.entries({
                    es2020: [
                        "setBigInt64",
                        "setBigUint64",
                        "getBigInt64",
                        "getBigUint64"
                    ]
                })),
                BigInt: new Map(Object.entries({
                    es2020: emptyArray
                })),
                RelativeTimeFormat: new Map(Object.entries({
                    es2020: [
                        "format",
                        "formatToParts",
                        "resolvedOptions"
                    ]
                })),
                Int8Array: new Map(Object.entries({
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                Uint8Array: new Map(Object.entries({
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                Uint8ClampedArray: new Map(Object.entries({
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                Int16Array: new Map(Object.entries({
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                Uint16Array: new Map(Object.entries({
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                Int32Array: new Map(Object.entries({
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                Uint32Array: new Map(Object.entries({
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                Float32Array: new Map(Object.entries({
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                Float64Array: new Map(Object.entries({
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                BigInt64Array: new Map(Object.entries({
                    es2020: emptyArray,
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                BigUint64Array: new Map(Object.entries({
                    es2020: emptyArray,
                    es2022: [
                        "at"
                    ],
                    es2023: [
                        "findLastIndex",
                        "findLast"
                    ]
                })),
                Error: new Map(Object.entries({
                    es2022: [
                        "cause"
                    ]
                }))
            }));
        }