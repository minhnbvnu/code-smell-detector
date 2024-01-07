constructor(scene) {

        const lightEntity = new Entity('AmbientLight');
        lightEntity.addComponent('light', {
            type: 'directional',
            affectDynamic: true,
            affectLightmapped: false,
            bake: true,
            bakeNumSamples: scene.ambientBakeNumSamples,
            castShadows: true,
            normalOffsetBias: 0.05,
            shadowBias: 0.2,
            shadowDistance: 1,  // this is updated during shadow map rendering
            shadowResolution: 2048,
            shadowType: SHADOW_PCF3,
            color: Color.WHITE,
            intensity: 1,
            bakeDir: false
        });

        super(scene, lightEntity.light.light);
    }