function createMutationObservers(){if(_supportMutationObserver){var mutationTarget,mutationAttrName,mutationIsClass,oldMutationVal,newClassVal,hostClassNameRegex,contentTimeout,now,sizeAuto,action,mutationObserverContentLag=11,mutationObserver=COMPATIBILITY.mO(),contentLastUpdate=COMPATIBILITY.now();_mutationObserverContentCallback=function _mutationObserverContentCallback(mutations){var doUpdate=!1;return _initialized&&!_sleeping&&(each(mutations,(function(){return!(doUpdate=isUnknownMutation(this))})),doUpdate&&(now=COMPATIBILITY.now(),sizeAuto=_heightAutoCache||_widthAutoCache,action=function action(){_destroyed||(contentLastUpdate=now,_isTextarea&&textareaUpdate(),sizeAuto?update():_base.update(_strAuto))},clearTimeout(contentTimeout),mutationObserverContentLag<=0||now-contentLastUpdate>mutationObserverContentLag||!sizeAuto?action():contentTimeout=setTimeout(action,mutationObserverContentLag))),doUpdate},_mutationObserverHost=new mutationObserver(_mutationObserverHostCallback=function _mutationObserverHostCallback(mutations){var mutation,doUpdate=!1,doUpdateForce=!1,mutatedAttrs=[];return _initialized&&!_sleeping&&(each(mutations,(function(){mutationTarget=(mutation=this).target,mutationAttrName=mutation.attributeName,mutationIsClass=mutationAttrName===LEXICON.c,oldMutationVal=mutation.oldValue,newClassVal=mutationTarget.className,_domExists&&mutationIsClass&&!doUpdateForce&&oldMutationVal.indexOf(_classNameHostElementForeign)>-1&&newClassVal.indexOf(_classNameHostElementForeign)<0&&(hostClassNameRegex=createHostClassNameRegExp(!0),_hostElementNative.className=newClassVal.split(_strSpace).concat(oldMutationVal.split(_strSpace).filter((function(name){return name.match(hostClassNameRegex)}))).join(_strSpace),doUpdate=doUpdateForce=!0),doUpdate||(doUpdate=mutationIsClass?hostClassNamesChanged(oldMutationVal,newClassVal):mutationAttrName!==LEXICON.s||oldMutationVal!==mutationTarget[LEXICON.s].cssText),mutatedAttrs.push(mutationAttrName)})),updateViewportAttrsFromTarget(mutatedAttrs),doUpdate&&_base.update(doUpdateForce||_strAuto)),doUpdate}),_mutationObserverContent=new mutationObserver(_mutationObserverContentCallback)}}