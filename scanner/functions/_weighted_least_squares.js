function _weighted_least_squares(wxy){var ybar,xbar,beta_i,x0;var _wm=_weighted_means(wxy);xbar=_wm.xbar;ybar=_wm.ybar;var beta=_weighted_beta(wxy,xbar,ybar)
return{beta:beta,xbar:xbar,ybar:ybar,x0:ybar-beta*xbar}
return num/denom}