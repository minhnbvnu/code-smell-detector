function getBasePromise(assertion) {
            // We need to chain subsequent asserters on top of ones in the chain already (consider
            // `eventually.have.property("foo").that.equals("bar")`), only running them after the existing ones pass.
            // So the first base-promise is `assertion._obj`, but after that we use the assertions themselves, i.e.
            // previously derived promises, to chain off of.
            return typeof assertion.then === "function" ? assertion : assertion._obj;
        }