function getProcess(type) {
    return DATA_PROCESS_MAPPING[type] || DATA_PROCESS_MAPPING['default']
}