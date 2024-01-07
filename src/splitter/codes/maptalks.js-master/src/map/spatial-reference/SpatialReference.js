import { extend, isNil, hasOwn, sign, isString } from '../../core/util';
import Coordinate from '../../geo/Coordinate';
import Extent from '../../geo/Extent';
import * as projections from '../../geo/projection';
import Transformation from '../../geo/transformation/Transformation';
import { Measurer } from '../../geo/measurer';
const MAX_ZOOM = 23;

const DefaultSpatialReference = {
    'EPSG:3857': {
        'projection': 'EPSG:3857',
        'resolutions': (function () {
            const resolutions = [];
            const d = 2 * 6378137 * Math.PI;
            for (let i = 0; i < MAX_ZOOM; i++) {
                resolutions[i] = d / (256 * Math.pow(2, i));
            }
            return resolutions;
        })(),
        'fullExtent': {
            'top': 6378137 * Math.PI,
            'left': -6378137 * Math.PI,
            'bottom': -6378137 * Math.PI,
            'right': 6378137 * Math.PI
        }
    },
    'EPSG:4326': {
        'projection': 'EPSG:4326',
        'fullExtent': {
            'top': 90,
            'left': -180,
            'bottom': -90,
            'right': 180
        },
        'resolutions': (function () {
            const resolutions = [];
            for (let i = 0; i < MAX_ZOOM; i++) {
                resolutions[i] = 180 / (Math.pow(2, i) * 128);
            }
            return resolutions;
        })()
    },
    'BAIDU': {
        'projection': 'baidu',
        'resolutions': (function () {
            let res = Math.pow(2, 18);
            const resolutions = [];
            for (let i = 0; i < MAX_ZOOM; i++) {
                resolutions[i] = res;
                res *= 0.5;
            }
            return resolutions;
        })(),
        'fullExtent': {
            'top': 33554432,
            'left': -33554432,
            'bottom': -33554432,
            'right': 33554432
        }
    },
    'IDENTITY': {
        'projection': 'identity',
        'resolutions': (function () {
            let res = Math.pow(2, 8);
            const resolutions = [];
            for (let i = 0; i < MAX_ZOOM; i++) {
                resolutions[i] = res;
                res *= 0.5;
            }
            return resolutions;
        })(),
        'fullExtent': {
            'top': 200000,
            'left': -200000,
            'bottom': -200000,
            'right': 200000
        }
    },

    // TileSystem: [1, -1, -6378137 * Math.PI, 6378137 * Math.PI]
    'PRESET-VT-3857': {
        'projection': 'EPSG:3857',
        'resolutions': (function () {
            const resolutions = [];
            const d = 6378137 * Math.PI;
            for (let i = 0; i < MAX_ZOOM; i++) {
                resolutions[i] = d / (256 * Math.pow(2, i));
            }
            return resolutions;
        })(),
        'fullExtent': {
            'top': 6378137 * Math.PI,
            'left': -6378137 * Math.PI,
            'bottom': -6378137 * Math.PI,
            'right': 6378137 * Math.PI
        }
    },

    'PRESET-VT-4326': {
        'projection': 'EPSG:4326',
        'fullExtent': {
            'top': 90,
            'left': -180,
            'bottom': -90,
            'right': 180
        },
        'resolutions': (function () {
            const resolutions = [];
            for (let i = 0; i < MAX_ZOOM; i++) {
                resolutions[i] = 180 / 4 / (Math.pow(2, i) * 128);
            }
            return resolutions;
        })()
    }
};

DefaultSpatialReference['EPSG:4490'] = DefaultSpatialReference['EPSG:4326'];
DefaultSpatialReference['PRESET-3857-512'] = DefaultSpatialReference['PRESET-VT-3857'];
DefaultSpatialReference['PRESET-4326-512'] = DefaultSpatialReference['PRESET-VT-4326'];

export default class SpatialReference {
    constructor(options = {}) {
        this.options = options;
        this._initSpatialRef();
    }

    static registerPreset(name, value) {
        name = name && name.toUpperCase();
        if (DefaultSpatialReference[name]) {
            console.warn(`Spatial reference ${name} already registered.`);
        }
        DefaultSpatialReference[name] = value;
    }

    static getPreset(preset) {
        return DefaultSpatialReference[preset.toUpperCase()];
    }

    static getAllPresets() {
        return Object.keys(DefaultSpatialReference);
    }

    static getProjectionInstance(projection) {
        if (!projection) {
            return null;
        }
        if (isString(projection)) {
            projection = {
                code: projection
            };
        }
        // a custom one
        if (projection.project) {
            if (!projection.locate) {
                projection = extend({}, projection);
                if (projection.measure === 'identity') {
                    extend(projection, Measurer.getInstance('IDENTITY'));
                } else {
                    extend(projection, Measurer.getInstance('EPSG:4326'));
                }
            }
            return projection;
        }
        const prjName = (projection.code + '').toLowerCase();
        for (const p in projections) {
            if (hasOwn(projections, p)) {
                const names = projections[p].aliases || [];
                const code = projections[p]['code'];
                names.push(code);
                for (let i = 0; i < names.length; i++) {
                    if (names[i].toLowerCase() === prjName) {
                        if (projections[p].create) {
                            const instance = projections[p].create(projection);
                            instance.code = names[i];
                            return instance;
                        } else {
                            if (projections[p].code === names[i]) {
                                return projections[p];
                            }
                            const instance = extend({}, projections[p]);
                            instance.code = names[i];
                            return instance;
                        }
                    }
                }
            }
        }
        return null;
    }

    static equals(sp1, sp2) {
        if (isString(sp1) || isString(sp2)) {
            return sp1 === sp2;
        }
        if (!sp1 && !sp2) {
            return true;
        } else if (!sp1 || !sp2) {
            return false;
        }
        if (sp1.projection !== sp2.projection) {
            return false;
        }
        const f1 = sp1.fullExtent, f2 = sp2.fullExtent;
        if (f1 && !f2 || !f1 && f2) {
            return false;
        }
        if (f1 && f2) {
            if (f1.top !== f2.top || f1.bottom !== f2.bottom || f1.left !== f2.left || f1.right !== f2.right) {
                return false;
            }
        }
        const r1 = sp1.resolutions, r2 = sp2.resolutions;
        if (r1 && r2) {
            if (r1.length !== r2.length) {
                return false;
            }
            for (let i = 0; i < r1.length; i++) {
                if (r1[i] !== r2[i]) {
                    return false;
                }
            }
        } else if (r1 || r2) {
            return false;
        }
        return true;
    }

    _initSpatialRef() {
        let projection = this.options['projection'];
        if (projection) {
            projection = SpatialReference.getProjectionInstance(projection);
        } else {
            projection = projections.DEFAULT;
        }
        if (!projection) {
            throw new Error('must provide a valid projection in map\'s spatial reference.');
        }
        projection = extend({}, projections.Common, projection);
        if (!projection.measureLength) {
            extend(projection, Measurer.DEFAULT);
        }
        this._projection = projection;
        let defaultSpatialRef,
            resolutions = this.options['resolutions'];
        if (!resolutions) {
            if (projection['code']) {
                defaultSpatialRef = DefaultSpatialReference[projection['code'].toUpperCase()];
                if (defaultSpatialRef) {
                    resolutions = defaultSpatialRef['resolutions'];
                    this.isEPSG = projection['code'] !== 'IDENTITY';
                }
            }
            if (!resolutions) {
                throw new Error('must provide valid resolutions in map\'s spatial reference.');
            }
        }
        this._resolutions = resolutions;
        this._pyramid = true;
        if (this._pyramid) {
            for (let i = 0; i < resolutions.length; i++) {
                if (resolutions[i] && resolutions[i - 1]) {
                    if (resolutions[i - 1] / resolutions[i] !== 2) {
                        this._pyramid = false;
                        break;
                    }
                }
            }
        }
        let fullExtent = this.options['fullExtent'];
        if (!fullExtent) {
            if (projection['code']) {
                defaultSpatialRef = DefaultSpatialReference[projection['code'].toUpperCase()];
                if (defaultSpatialRef) {
                    fullExtent = defaultSpatialRef['fullExtent'];
                }
            }
            if (!fullExtent) {
                throw new Error('must provide a valid fullExtent in map\'s spatial reference.');
            }
        }
        if (!isNil(fullExtent['left'])) {
            this._fullExtent = new Extent(new Coordinate(fullExtent['left'], fullExtent['top']),
                new Coordinate(fullExtent['right'], fullExtent['bottom']));
        } else {
            //xmin, ymin, xmax, ymax
            this._fullExtent = new Extent(fullExtent);
            fullExtent['left'] = fullExtent['xmin'];
            fullExtent['right'] = fullExtent['xmax'];
            fullExtent['top'] = fullExtent['ymax'];
            fullExtent['bottom'] = fullExtent['ymin'];
        }

        if (isNil(fullExtent['top']) || isNil(fullExtent['bottom']) || isNil(fullExtent['left']) || isNil(fullExtent['right'])) {
            throw new Error('must provide valid top/bottom/left/right in fullExtent.');
        }

        //set left, right, top, bottom value
        extend(this._fullExtent, fullExtent);

        this._projection.fullExtent = fullExtent;

        const a = fullExtent['right'] >= fullExtent['left'] ? 1 : -1,
            b = fullExtent['top'] >= fullExtent['bottom'] ? -1 : 1;
        this._transformation = new Transformation([a, b, 0, 0]);
    }

    getResolutions() {
        return this._resolutions || [];
    }

    getResolution(zoom) {
        let z = (zoom | 0);
        if (z < 0) {
            z = 0;
        } else if (z > this._resolutions.length - 1) {
            z = this._resolutions.length - 1;
        }
        const res = this._resolutions[z];
        if (z !== zoom && zoom > 0 && z < this._resolutions.length - 1) {
            const next = this._resolutions[z + 1];
            return res + (next - res) * (zoom - z);
        }
        return res;
    }

    getProjection() {
        return this._projection;
    }

    getFullExtent() {
        return this._fullExtent;
    }

    getTransformation() {
        return this._transformation;
    }

    getMinZoom() {
        for (let i = 0; i < this._resolutions.length; i++) {
            if (!isNil(this._resolutions[i])) {
                return i;
            }
        }
        return 0;
    }

    getMaxZoom() {
        for (let i = this._resolutions.length - 1; i >= 0; i--) {
            if (!isNil(this._resolutions[i])) {
                return i;
            }
        }
        return this._resolutions.length - 1;
    }

    getZoomDirection() {
        return sign(this._resolutions[this.getMinZoom()] - this._resolutions[this.getMaxZoom()]);
    }

    toJSON() {
        if (!this.json) {
            this.json = {
                'resolutions': this._resolutions,
                'fullExtent': {
                    'top': this._fullExtent.top,
                    'left': this._fullExtent.left,
                    'bottom': this._fullExtent.bottom,
                    'right': this._fullExtent.right
                },
                'projection': this._projection.code
            };
        }
        return this.json;
    }

    isPyramid() {
        return this._pyramid;
    }
}
