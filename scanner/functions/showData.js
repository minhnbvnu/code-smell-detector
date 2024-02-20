function showData(data) {
						$(c).find('.start').html('');
						$(c).removeClass('wait').append(data);
						if( o.root == t ) $(c).find('UL:hidden').show();
						else $(c).find('UL:hidden').slideDown({ duration: o.expandSpeed, easing: o.expandEasing });
						bindTree(c);
						if (o.expandedFolder != null) {
						    $(c).find(".directory.collapsed").each(function (i,f) {
						       if ((o.expandedFolder).match($(f).children().attr('data-path'))) {
						            showTree($(f), $(f).children().attr('data-path').match(/.*\//));
						            $(f).removeClass('collapsed').addClass('expanded');
						        };

						    });
						}


						o.after(data);
					}