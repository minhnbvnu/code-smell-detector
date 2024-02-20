function executeSteps(till, cancellationToken, writeFile2, customTransformers) {
                while (step <= till && step < 8 /* Done */) {
                    const currentStep = step;
                    switch (step) {
                        case 0 /* CreateProgram */:
                            createProgram2();
                            break;
                        case 1 /* SyntaxDiagnostics */:
                            getSyntaxDiagnostics(cancellationToken);
                            break;
                        case 2 /* SemanticDiagnostics */:
                            getSemanticDiagnostics(cancellationToken);
                            break;
                        case 3 /* Emit */:
                            emit(writeFile2, cancellationToken, customTransformers);
                            break;
                        case 5 /* EmitBuildInfo */:
                            emitBuildInfo(writeFile2, cancellationToken);
                            break;
                        case 4 /* EmitBundle */:
                            emitBundle(writeFile2, customTransformers);
                            break;
                        case 6 /* BuildInvalidatedProjectOfBundle */:
                            Debug.checkDefined(invalidatedProjectOfBundle).done(cancellationToken, writeFile2, customTransformers);
                            step = 8 /* Done */;
                            break;
                        case 7 /* QueueReferencingProjects */:
                            queueReferencingProjects(state, project, projectPath, projectIndex, config, buildOrder, Debug.checkDefined(buildResult));
                            step++;
                            break;
                        case 8 /* Done */:
                        default:
                            assertType(step);
                    }
                    Debug.assert(step > currentStep);
                }
            }