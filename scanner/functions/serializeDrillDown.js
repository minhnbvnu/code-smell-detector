function serializeDrillDown(drilldownManager, viewId, param) {
            if (param) {
                const steps = drilldownManager.convertFromUrl({
                    viewId,
                    drilldownInfoParam: param,
                });

                return steps.map((step) => {
                    let selection;
                    if (step.viewId === 'overview') {
                        selection = step.selection || null;
                    } else {
                        selection = isEmpty(step.selection) ? null : 'set';
                    }

                    return {
                        viewId: step.viewId,
                        selection,
                    };
                });
            } else {
                return [];
            }
        }