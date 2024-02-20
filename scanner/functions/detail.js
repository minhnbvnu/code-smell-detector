function detail(h, value) {
            var comma_needed, singularity;
            if (Array.isArray(value)) {
                output.push('<div><i>' + h + '</i> ');
                value.sort().forEach(function (item) {
                    if (item !== singularity) {
                        singularity = item;
                        output.push((comma_needed ? ', ' : '') + singularity);
                        comma_needed = true;
                    }
                });
                output.push('</div>');
            } else if (value) {
                output.push('<div><i>' + h + '</i> ' + value + '</div>');
            }
        }