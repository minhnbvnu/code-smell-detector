function zde(e,t){if(R3=mg,e=Sj(),zT(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var i=n.anchorOffset,a=n.focusNode;n=n.focusOffset;try{r.nodeType,a.nodeType}catch{r=null;break e}var l=0,s=-1,u=-1,c=0,d=0,f=e,h=null;t:for(;;){for(var p;f!==r||i!==0&&f.nodeType!==3||(s=l+i),f!==a||n!==0&&f.nodeType!==3||(u=l+n),f.nodeType===3&&(l+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===e)break t;if(h===r&&++c===i&&(s=l),h===a&&++d===n&&(u=l),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}r=s===-1||u===-1?null:{start:s,end:u}}else r=null}r=r||{start:0,end:0}}else r=null;for(I3={focusedElem:e,selectionRange:r},mg=!1,Be=t;Be!==null;)if(t=Be,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Be=e;else for(;Be!==null;){t=Be;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var g=m.memoizedProps,b=m.memoizedState,v=t.stateNode,y=v.getSnapshotBeforeUpdate(t.elementType===t.type?g:Va(t.type,g),b);v.__reactInternalSnapshotBeforeUpdate=y}break;case 3:var $=t.stateNode.containerInfo;$.nodeType===1?$.textContent="":$.nodeType===9&&$.documentElement&&$.removeChild($.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ye(163))}}catch(x){qr(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,Be=e;break}Be=t.return}return m=yB,yB=!1,m}