function setupScrollbarCornerDOM(destroy){_scrollbarCornerElement=_scrollbarCornerElement||selectOrGenerateDivByClass(_classNameScrollbarCorner,!0),destroy?_domExists&&_initialized?removeClass(_scrollbarCornerElement.removeAttr(LEXICON.s),_classNamesDynamicDestroy):remove(_scrollbarCornerElement):_domExists||_hostElement.append(_scrollbarCornerElement)}