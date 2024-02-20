function pushPrivateNameGenerationScope(newPrivateNameTempFlags, newReservedMemberNames) {
                privateNameTempFlagsStack.push(privateNameTempFlags);
                privateNameTempFlags = newPrivateNameTempFlags;
                reservedPrivateNamesStack.push(reservedNames);
                reservedPrivateNames = newReservedMemberNames;
            }