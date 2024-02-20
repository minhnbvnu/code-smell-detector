function getStringLikeTypeForType(type) {
                return type.flags & (1 /* Any */ | 402653316 /* StringLike */) ? type : getTemplateLiteralType(["", ""], [type]);
            }