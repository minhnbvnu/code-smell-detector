function createUnparsedTextLike(data, internal) {
                return createBaseUnparsedNode(internal ? 306 /* UnparsedInternalText */ : 305 /* UnparsedText */, data);
            }