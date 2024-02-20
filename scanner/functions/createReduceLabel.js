function createReduceLabel(target, antecedents, antecedent) {
                return initFlowNode({ flags: 1024 /* ReduceLabel */, target, antecedents, antecedent });
            }