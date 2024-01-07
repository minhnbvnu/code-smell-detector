module.exports = {
    frameworks: ['mocha', 'expect', 'expect-maptalks', 'sinon', 'happen'],
    basePath: '..',
    client: {
        mocha: {
            timeout: 18000
        }
    },
    files: [
        { pattern: 'dist/maptalks.css', type: 'css' },
        'dist/maptalks.js',
        // js for UA
        'test/resources/ua-parser.min.js',
        //js for TileOffsetSpec.js
        'test/resources/chncrs.js',
        'test/**/!(ClassSpec).js',
        {
            pattern: 'assets/css/**/*.css',
            included: false
        }, {
            pattern: 'assets/images/**/*.png',
            included: false
        }, {
            pattern: 'test/resources/*',
            included: false
        }
    ],
    proxies: {
        '/images/': '/base/assets/images/',
        '/css/': '/base/assets/css/',
        '/lib/': '/base/assets/lib/',
        '/resources/': '/base/test/resources/'
    },
    customLaunchers: {
        IE10: {
            base: 'IE',
            'x-ua-compatible': 'IE=EmulateIE10'
        },
        IE9: {
            base: 'IE',
            'x-ua-compatible': 'IE=EmulateIE9'
        }
    }
};
