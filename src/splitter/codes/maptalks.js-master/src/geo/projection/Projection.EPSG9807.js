import { isNil, extend } from '../../core/util';
import Common from './Projection';
import Coordinate from '../Coordinate';
import { WGS84Sphere } from '../measurer';
import etmerc from './etmerc.js';

// from proj_api.h
const RAD_TO_DEG = 57.295779513082321,
    DEG_TO_RAD = 0.017453292519943296;

// from pj_transform.c
const SRS_WGS84_SEMIMAJOR = 6378137;
const SRS_WGS84_ESQUARED = 0.0066943799901413165;


const aliases = ['Traverse_Mercator'];
/**
 * Traverse Mercator Projection
 *
 * @class
 * @category geo
 * @protected
 * @memberOf projection
 * @name EPSG9807
 * @mixes projection.Common
 * @mixes measurer.WGS84Sphere
 */
export default extend({}, Common, {
    code: 'EPSG:9807',
    aliases,
    create(params) {
        const P = {
            a: SRS_WGS84_SEMIMAJOR,
            es: SRS_WGS84_ESQUARED,
            x0: isNil(params.falseEasting) ? 500000 : params.falseEasting,
            y0: isNil(params.falseNorthing) ? 0 : params.falseNorthing,
            k0: params.scaleFactor || 0.9996,
            lam0: (params.centralMeridian || 0) * DEG_TO_RAD,
            phi0: (params.latitudeOfOrigin || 0) * DEG_TO_RAD,
            originLam0: params.startLongtitude || 0,
            originPhi0: params.startLatitude || 0
        };
        etmerc(P);
        const lp = { lam: 0, phi: 0 };
        const xy = {};
        let originX = 0;
        let originY = 0;
        if (P.originLam0 || P.originPhi0) {
            lp.lam = P.originLam0 * DEG_TO_RAD - P.lam0;
            lp.phi = P.originPhi0 * DEG_TO_RAD;
            P.fwd(lp, xy);
            originX = P.a * xy.x + P.x0;
            originY = P.a * xy.y + P.y0;
        }

        return extend({}, Common, {
            /**
             * "EPSG:9807", Code of the projection
             * @type {String}
             * @constant
             */
            code: 'EPSG:9807',
            aliases,
            centralMeridian: params.centralMeridian,
            project: function (p, out) {
                lp.lam = p.x * DEG_TO_RAD - P.lam0;
                lp.phi = p.y * DEG_TO_RAD;
                P.fwd(lp, xy);
                const x = P.a * xy.x + P.x0 - originX;
                const y = P.a * xy.y + P.y0 - originY;
                if (out) {
                    out.x = x;
                    out.y = y;
                    return out;
                }
                return new Coordinate(x, y);
            },
            unproject: function (p, out) {
                xy.x = (p.x - P.x0 + originX) / P.a;
                xy.y = (p.y - P.y0 + originY) / P.a;
                P.inv(xy, lp);
                const x = (lp.lam + P.lam0) * RAD_TO_DEG;
                const y = lp.phi * RAD_TO_DEG;
                if (out) {
                    out.x = x;
                    out.y = y;
                    return out;
                }
                return new Coordinate(x, y);
            }
        }, WGS84Sphere);
    }
});
