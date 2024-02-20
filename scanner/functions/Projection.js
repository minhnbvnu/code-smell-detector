function Projection(srsCode, callback) {
        if (!(this instanceof Projection)) {
            return new Projection(srsCode);
        }
        callback = callback || function (error) {
            if (error) {
                throw error;
            }
        };
        var json = (0, parseCode_1.default)(srsCode);
        if (typeof json !== 'object') {
            callback(srsCode);
            return;
        }
        var ourProj = Projection.projections.get(json.projName);
        if (!ourProj) {
            callback(srsCode);
            return;
        }
        if (json.datumCode && json.datumCode !== 'none') {
            var datumDef = (0, match_1.default)(Datum_1.default, json.datumCode);
            if (datumDef) {
                json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(',') : null);
                json.ellps = datumDef.ellipse;
                json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
            }
        }
        json.k0 = json.k0 || 1.0;
        json.axis = json.axis || 'enu';
        json.ellps = json.ellps || 'wgs84';
        json.lat1 = json.lat1 || json.lat0; // Lambert_Conformal_Conic_1SP, for example, needs this
        var sphere_ = (0, deriveConstants_1.sphere)(json.a, json.b, json.rf, json.ellps, json.sphere);
        var ecc = (0, deriveConstants_1.eccentricity)(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
        var nadgrids = (0, nadgrid_1.getNadgrids)(json.nadgrids);
        var datumObj = json.datum || (0, datum_1.default)(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2, nadgrids);
        (0, extend_1.default)(this, json); // transfer everything over from the projection because we don't know what we'll need
        (0, extend_1.default)(this, ourProj); // transfer all the methods from the projection
        // copy the 4 things over we calculated in deriveConstants.sphere
        this.a = sphere_.a;
        this.b = sphere_.b;
        this.rf = sphere_.rf;
        this.sphere = sphere_.sphere;
        // copy the 3 things we calculated in deriveConstants.eccentricity
        this.es = ecc.es;
        this.e = ecc.e;
        this.ep2 = ecc.ep2;
        // add in the datum object
        this.datum = datumObj;
        // init the projection
        this.init();
        // legecy callback from back in the day when it went to spatialreference.org
        callback(null, this);
    }