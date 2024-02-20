function addOutliningForLeadingCommentsForNode(n, sourceFile, cancellationToken, out) {
            if (isJsxText(n))
                return;
            addOutliningForLeadingCommentsForPos(n.pos, sourceFile, cancellationToken, out);
        }