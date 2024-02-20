function isNeitherUnitTypeNorNever(type) {
                return !(type.flags & (109472 /* Unit */ | 131072 /* Never */));
            }