function sn(t){var e=rt(t),i=e.year||0,n=e.quarter||0,o=e.month||0,r=e.week||e.isoWeek||0,s=e.day||0,a=e.hour||0,l=e.minute||0,h=e.second||0,u=e.millisecond||0;this._isValid=nn(e),this._milliseconds=+u+1e3*h+6e4*l+1e3*a*60*60,this._days=+s+7*r,this._months=+o+3*n+12*i,this._data={},this._locale=gi(),this._bubble()}