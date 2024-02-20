function lockOnOpen()
        {
            // Lock this object
            // If we didn't succeed
            //throw (new Error ("Failed locking " + this._name));

            // The object is locked
            this._locked = true;
            var ret = arguments[0].apply(this, arguments)
            return ret;
        }