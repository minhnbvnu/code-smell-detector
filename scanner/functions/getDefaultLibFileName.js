function getDefaultLibFileName(options) {
            switch (getEmitScriptTarget(options)) {
                case 99 /* ESNext */:
                    return "lib.esnext.full.d.ts";
                case 9 /* ES2022 */:
                    return "lib.es2022.full.d.ts";
                case 8 /* ES2021 */:
                    return "lib.es2021.full.d.ts";
                case 7 /* ES2020 */:
                    return "lib.es2020.full.d.ts";
                case 6 /* ES2019 */:
                    return "lib.es2019.full.d.ts";
                case 5 /* ES2018 */:
                    return "lib.es2018.full.d.ts";
                case 4 /* ES2017 */:
                    return "lib.es2017.full.d.ts";
                case 3 /* ES2016 */:
                    return "lib.es2016.full.d.ts";
                case 2 /* ES2015 */:
                    return "lib.es6.d.ts";
                default:
                    return "lib.d.ts";
            }
        }