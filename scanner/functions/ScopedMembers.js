function ScopedMembers(dualMembers) {
            this.dualMembers = dualMembers;
            this.allMembers = this.dualMembers;
            this.publicMembers = this.dualMembers.primaryTable;
            this.privateMembers = this.dualMembers.secondaryTable;
        }