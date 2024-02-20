function getExternalEvent(currentBuild, pipelineId, eventFactory) {
    if (!currentBuild.parentBuilds || !currentBuild.parentBuilds[pipelineId]) {
        return null;
    }

    const { eventId } = currentBuild.parentBuilds[pipelineId];

    return eventFactory.get(eventId);
}