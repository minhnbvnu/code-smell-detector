constructor(device) {

        this.device = device;
        this.version = 1;   // incremented each time slot configuration changes

        this.shadowAtlasResolution = 2048;
        this.shadowAtlas = null;

        // number of additional pixels to render past the required shadow camera angle (90deg for omni, outer for spot) of the shadow camera for clustered lights.
        // This needs to be a pixel more than a shadow filter needs to access.
        this.shadowEdgePixels = 3;

        this.cookieAtlasResolution = 4;
        this.cookieAtlas = new Texture(this.device, {
            name: 'CookieAtlas',
            width: this.cookieAtlasResolution,
            height: this.cookieAtlasResolution,
            format: PIXELFORMAT_RGBA8,
            cubemap: false,
            mipmaps: false,
            minFilter: FILTER_NEAREST,
            magFilter: FILTER_NEAREST,
            addressU: ADDRESS_CLAMP_TO_EDGE,
            addressV: ADDRESS_CLAMP_TO_EDGE
        });

        this.cookieRenderTarget = new RenderTarget({
            colorBuffer: this.cookieAtlas,
            depth: false,
            flipY: true
        });

        // available slots (of type Slot)
        this.slots = [];

        // current subdivision strategy - matches format of LightingParams.atlasSplit
        this.atlasSplit = [];

        // offsets to individual faces of a cubemap inside 3x3 grid in an atlas slot
        this.cubeSlotsOffsets = [
            new Vec2(0, 0),
            new Vec2(0, 1),
            new Vec2(1, 0),
            new Vec2(1, 1),
            new Vec2(2, 0),
            new Vec2(2, 1)
        ];

        // handles gap between slots
        this.scissorVec = new Vec4();

        this.allocateShadowAtlas(1);  // placeholder as shader requires it
        this.allocateCookieAtlas(1);  // placeholder as shader requires it
        this.allocateUniforms();
    }