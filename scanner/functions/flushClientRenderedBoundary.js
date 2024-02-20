function flushClientRenderedBoundary(request, destination, boundary) {
              return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
            }