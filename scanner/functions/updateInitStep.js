async function updateInitStep(build, app) {
    const step = await app.stepFactory.get({ buildId: build.id, name: 'sd-setup-init' });
    // If there is no init step, do nothing

    if (!step) {
        return null;
    }

    step.endTime = build.startTime || new Date().toISOString();
    step.code = 0;

    return step.update();
}