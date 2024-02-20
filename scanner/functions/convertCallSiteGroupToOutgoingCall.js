function convertCallSiteGroupToOutgoingCall(program, entries) {
            return createCallHierarchyOutgoingCall(createCallHierarchyItem(program, entries[0].declaration), map(entries, (entry) => createTextSpanFromRange(entry.range)));
        }