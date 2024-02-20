function convertCallSiteGroupToIncomingCall(program, entries) {
            return createCallHierarchyIncomingCall(createCallHierarchyItem(program, entries[0].declaration), map(entries, (entry) => createTextSpanFromRange(entry.range)));
        }