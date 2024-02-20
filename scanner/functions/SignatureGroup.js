function SignatureGroup() {
            this.signatures = [];
            this.hasImplementation = true;
            this.definitionSignature = null;
            this.hasBeenTypechecked = false;
            this.flags = TypeScript.SignatureFlags.None;
        }