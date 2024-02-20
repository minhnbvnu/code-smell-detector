function needsBothLoaders(){
            var versionCheck, packageCheck;

            versionCheck = !isNaN(+version) && +version < 45;
            packageCheck = options.packages.indexOf("geochart") > -1 ||
                options.packages.indexOf("map") > -1;

            return versionCheck && packageCheck;
        }