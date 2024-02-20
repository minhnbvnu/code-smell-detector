function update_sectors(my_sectors) {
        if (!sector_load) {
            var oid = subscription_id;
            var itype = subscription_type;
            var data = {
                        'oid': oid,
                        'sectors': my_sectors.toString(),
                        'itype': itype
            };
            $.ajax({
                type: "POST",
                url: sector_modify,
                data: data,
                datatype: 'json',
            });
        }
    }