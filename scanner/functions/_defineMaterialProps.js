function _defineMaterialProps() {
    _defineColor('ambient', new Color(0.7, 0.7, 0.7));
    _defineColor('diffuse', new Color(1, 1, 1));
    _defineColor('specular', new Color(0, 0, 0));
    _defineColor('emissive', new Color(0, 0, 0));
    _defineColor('sheen', new Color(1, 1, 1));
    _defineColor('attenuation', new Color(1, 1, 1));
    _defineFloat('emissiveIntensity', 1);
    _defineFloat('specularityFactor', 1);
    _defineFloat('sheenGloss', 0.0);

    _defineFloat('gloss', 0.25, (material, device, scene) => {
        return material.shadingModel === SPECULAR_PHONG ?
            // legacy: expand back to specular power
            Math.pow(2, material.gloss * 11) :
            material.gloss;
    });

    _defineFloat('heightMapFactor', 1, (material, device, scene) => {
        return material.heightMapFactor * 0.025;
    });
    _defineFloat('opacity', 1);
    _defineFloat('alphaFade', 1);
    _defineFloat('alphaTest', 0);       // NOTE: overwrites Material.alphaTest
    _defineFloat('bumpiness', 1);
    _defineFloat('normalDetailMapBumpiness', 1);
    _defineFloat('reflectivity', 1);
    _defineFloat('occludeSpecularIntensity', 1);
    _defineFloat('refraction', 0);
    _defineFloat('refractionIndex', 1.0 / 1.5); // approx. (air ior / glass ior)
    _defineFloat('thickness', 0);
    _defineFloat('attenuationDistance', 0);
    _defineFloat('metalness', 1);
    _defineFloat('anisotropy', 0);
    _defineFloat('clearCoat', 0);
    _defineFloat('clearCoatGloss', 1);
    _defineFloat('clearCoatBumpiness', 1);
    _defineFloat('aoUvSet', 0, null); // legacy

    _defineFloat('iridescence', 0);
    _defineFloat('iridescenceRefractionIndex', 1.0 / 1.5);
    _defineFloat('iridescenceThicknessMin', 0);
    _defineFloat('iridescenceThicknessMax', 0);

    _defineObject('ambientSH');

    _defineObject('cubeMapProjectionBox', (material, device, scene) => {
        const uniform = material._allocUniform('cubeMapProjectionBox', () => {
            return [{
                name: 'envBoxMin',
                value: new Float32Array(3)
            }, {
                name: 'envBoxMax',
                value: new Float32Array(3)
            }];
        });

        const bboxMin = material.cubeMapProjectionBox.getMin();
        const minUniform = uniform[0].value;
        minUniform[0] = bboxMin.x;
        minUniform[1] = bboxMin.y;
        minUniform[2] = bboxMin.z;

        const bboxMax = material.cubeMapProjectionBox.getMax();
        const maxUniform = uniform[1].value;
        maxUniform[0] = bboxMax.x;
        maxUniform[1] = bboxMax.y;
        maxUniform[2] = bboxMax.z;

        return uniform;
    });

    _defineFlag('ambientTint', false);
    _defineFlag('diffuseTint', false);
    _defineFlag('specularTint', false);
    _defineFlag('specularityFactorTint', false);
    _defineFlag('emissiveTint', false);
    _defineFlag('fastTbn', false);
    _defineFlag('useMetalness', false);
    _defineFlag('useMetalnessSpecularColor', false);
    _defineFlag('useSheen', false);
    _defineFlag('enableGGXSpecular', false);
    _defineFlag('occludeDirect', false);
    _defineFlag('normalizeNormalMap', true);
    _defineFlag('conserveEnergy', true);
    _defineFlag('opacityFadesSpecular', true);
    _defineFlag('occludeSpecular', SPECOCC_AO);
    _defineFlag('shadingModel', SPECULAR_BLINN);
    _defineFlag('fresnelModel', FRESNEL_SCHLICK); // NOTE: this has been made to match the default shading model (to fix a bug)
    _defineFlag('useDynamicRefraction', false);
    _defineFlag('cubeMapProjection', CUBEPROJ_NONE);
    _defineFlag('customFragmentShader', null);
    _defineFlag('useFog', true);
    _defineFlag('useLighting', true);
    _defineFlag('useGammaTonemap', true);
    _defineFlag('useSkybox', true);
    _defineFlag('forceUv1', false);
    _defineFlag('pixelSnap', false);
    _defineFlag('twoSidedLighting', false);
    _defineFlag('nineSlicedMode', undefined); // NOTE: this used to be SPRITE_RENDERMODE_SLICED but was undefined pre-Rollup
    _defineFlag('msdfTextAttribute', false);
    _defineFlag('useIridescence', false);
    _defineFlag('glossInvert', false);
    _defineFlag('sheenGlossInvert', false);
    _defineFlag('clearCoatGlossInvert', false);
    _defineFlag('opacityDither', false);
    _defineFlag('opacityShadowDither', false);

    _defineTex2D('diffuse');
    _defineTex2D('specular');
    _defineTex2D('emissive');
    _defineTex2D('thickness', 'g');
    _defineTex2D('specularityFactor', 'g');
    _defineTex2D('normal', '');
    _defineTex2D('metalness', 'g');
    _defineTex2D('gloss', 'g');
    _defineTex2D('opacity', 'a');
    _defineTex2D('refraction', 'g');
    _defineTex2D('height', 'g', false);
    _defineTex2D('ao', 'g');
    _defineTex2D('light', 'rgb', true, 1);
    _defineTex2D('msdf', '');
    _defineTex2D('diffuseDetail', 'rgb', false);
    _defineTex2D('normalDetail', '');
    _defineTex2D('aoDetail', 'g', false);
    _defineTex2D('clearCoat', 'g');
    _defineTex2D('clearCoatGloss', 'g');
    _defineTex2D('clearCoatNormal', '');
    _defineTex2D('sheen', 'rgb');
    _defineTex2D('sheenGloss', 'g');
    _defineTex2D('iridescence', 'g');
    _defineTex2D('iridescenceThickness', 'g');

    _defineFlag('diffuseDetailMode', DETAILMODE_MUL);
    _defineFlag('aoDetailMode', DETAILMODE_MUL);

    _defineObject('cubeMap');
    _defineObject('sphereMap');
    _defineObject('envAtlas');

    // prefiltered cubemap getter
    const getterFunc = function () {
        return this._prefilteredCubemaps;
    };

    // prefiltered cubemap setter
    const setterFunc = function (value) {
        const cubemaps = this._prefilteredCubemaps;

        value = value || [];

        let changed = false;
        let complete = true;
        for (let i = 0; i < 6; ++i) {
            const v = value[i] || null;
            if (cubemaps[i] !== v) {
                cubemaps[i] = v;
                changed = true;
            }
            complete = complete && (!!cubemaps[i]);
        }

        if (changed) {
            if (complete) {
                this.envAtlas = EnvLighting.generatePrefilteredAtlas(cubemaps, {
                    target: this.envAtlas
                });
            } else {
                if (this.envAtlas) {
                    this.envAtlas.destroy();
                    this.envAtlas = null;
                }
            }
            this._dirtyShader = true;
        }
    };

    const empty = [null, null, null, null, null, null];

    definePropInternal('prefilteredCubemaps', () => empty.slice(), setterFunc, getterFunc);
}