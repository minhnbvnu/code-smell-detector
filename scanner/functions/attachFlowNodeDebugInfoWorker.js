function attachFlowNodeDebugInfoWorker(flowNode) {
                        if (!("__debugFlowFlags" in flowNode)) {
                            Object.defineProperties(flowNode, {
                                // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
                                __tsDebuggerDisplay: {
                                    value() {
                                        const flowHeader = this.flags & 2 /* Start */ ? "FlowStart" : this.flags & 4 /* BranchLabel */ ? "FlowBranchLabel" : this.flags & 8 /* LoopLabel */ ? "FlowLoopLabel" : this.flags & 16 /* Assignment */ ? "FlowAssignment" : this.flags & 32 /* TrueCondition */ ? "FlowTrueCondition" : this.flags & 64 /* FalseCondition */ ? "FlowFalseCondition" : this.flags & 128 /* SwitchClause */ ? "FlowSwitchClause" : this.flags & 256 /* ArrayMutation */ ? "FlowArrayMutation" : this.flags & 512 /* Call */ ? "FlowCall" : this.flags & 1024 /* ReduceLabel */ ? "FlowReduceLabel" : this.flags & 1 /* Unreachable */ ? "FlowUnreachable" : "UnknownFlow";
                                        const remainingFlags = this.flags & ~(2048 /* Referenced */ - 1);
                                        return `${flowHeader}${remainingFlags ? ` (${formatFlowFlags(remainingFlags)})` : ""}`;
                                    }
                                },
                                __debugFlowFlags: { get() {
                                        return formatEnum(this.flags, FlowFlags, 
                                        /*isFlags*/
                                        true);
                                    } },
                                __debugToString: { value() {
                                        return formatControlFlowGraph(this);
                                    } }
                            });
                        }
                    }