function createNavigateToItem(rawItem) {
            const declaration = rawItem.declaration;
            const container = getContainerNode(declaration);
            const containerName = container && getNameOfDeclaration(container);
            return {
                name: rawItem.name,
                kind: getNodeKind(declaration),
                kindModifiers: getNodeModifiers(declaration),
                matchKind: PatternMatchKind[rawItem.matchKind],
                isCaseSensitive: rawItem.isCaseSensitive,
                fileName: rawItem.fileName,
                textSpan: createTextSpanFromNode(declaration),
                // TODO(jfreeman): What should be the containerName when the container has a computed name?
                containerName: containerName ? containerName.text : "",
                containerKind: containerName ? getNodeKind(container) : "" /* unknown */
            };
        }