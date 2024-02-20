function parseErrors(series, i){

        var points = series.datapoints.points;

        // read errors from points array
        var exl = null,
                exu = null,
                eyl = null,
                eyu = null;
        var xerr = series.points.xerr,
                yerr = series.points.yerr;

        var eb = series.points.errorbars;
        // error bars - first X
        if (eb == 'x' || eb == 'xy') {
            if (xerr.asymmetric) {
                exl = points[i + 2];
                exu = points[i + 3];
                if (eb == 'xy')
                    if (yerr.asymmetric){
                        eyl = points[i + 4];
                        eyu = points[i + 5];
                    } else eyl = points[i + 4];
            } else {
                exl = points[i + 2];
                if (eb == 'xy')
                    if (yerr.asymmetric) {
                        eyl = points[i + 3];
                        eyu = points[i + 4];
                    } else eyl = points[i + 3];
            }
        // only Y
        } else if (eb == 'y')
            if (yerr.asymmetric) {
                eyl = points[i + 2];
                eyu = points[i + 3];
            } else eyl = points[i + 2];

        // symmetric errors?
        if (exu == null) exu = exl;
        if (eyu == null) eyu = eyl;

        var errRanges = [exl, exu, eyl, eyu];
        // nullify if not showing
        if (!xerr.show){
            errRanges[0] = null;
            errRanges[1] = null;
        }
        if (!yerr.show){
            errRanges[2] = null;
            errRanges[3] = null;
        }
        return errRanges;
    }