function getPipelineAndJob(name, pipelineId) {
    let externalJobName = name;
    let externalPipelineId = pipelineId;
    let isExternal = false;

    if (isExternalTrigger(name)) {
        isExternal = true;
        [, externalPipelineId, externalJobName] = EXTERNAL_TRIGGER_ALL.exec(name);
    }

    return { externalPipelineId, externalJobName, isExternal };
}