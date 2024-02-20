function LeaveRequest(args) {
    var me = this;

    // Make sure all required data is provided
    _.each(
        [
          'leave_type','from_date','from_date_part',
          'to_date', 'to_date_part', 'reason'
        ],
        function(property){
            if (! _.has(args, property)) {
                throw new Error('No mandatory '+property+' was provided to LeaveRequest constructor');
            }
        }
    );

    // From date should not be bigger then to
    if (moment.utc(args.from_date).toDate() > moment.utc(args.to_date).toDate()){
        throw new Error( 'From date should be before To date at LeaveRequest constructor' );
    }

    _.each(
        [
          'leave_type','from_date','from_date_part',
          'to_date', 'to_date_part', 'reason', 'user'
        ],
        function(property){ me[property] = args[property]; }
    );
}