function getAllFixes(context) {
            return fixIdToRegistration.get(cast(context.fixId, isString)).getAllCodeActions(context);
        }