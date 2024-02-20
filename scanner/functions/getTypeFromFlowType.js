function getTypeFromFlowType(flowType) {
                return flowType.flags === 0 ? flowType.type : flowType;
            }