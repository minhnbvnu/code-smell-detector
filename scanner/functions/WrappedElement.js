function WrappedElement(_a) {
                            var element = _a.element, classNames = _a.classNames;
                            this.element = element;
                            this.classNames = classNames;
                            if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLSelectElement)) {
                                throw new TypeError('Invalid element passed');
                            }
                            this.isDisabled = false;
                        }