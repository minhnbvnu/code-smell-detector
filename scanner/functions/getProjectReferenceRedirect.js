function getProjectReferenceRedirect(fileName) {
                const referencedProject = getProjectReferenceRedirectProject(fileName);
                return referencedProject && getProjectReferenceOutputName(referencedProject, fileName);
            }