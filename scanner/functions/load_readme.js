function load_readme (extension) {
        var readme = $('.nbext-readme');
        var readme_contents = readme.children('.panel-body').empty();
        var readme_title = readme.children('.panel-heading').children('span').empty();

        if (extension.readme === undefined) {
            readme.slideUp(100);
            return;
        }
        readme.slideDown(100);

        var url = extension.readme;
        var is_absolute = /^(f|ht)tps?:\/\//i.test(url);
        if (is_absolute || (utils.splitext(url)[1] !== '.md')) {
            // provide a link only
            var desc = extension.ui.find('.nbext-desc');
            var link = desc.find('.nbext-readme-more-link');
            if (link.length === 0) {
                desc.append(' ');
                link = $('<a/>')
                    .addClass('nbext-readme-more-link')
                    .text('more...')
                    .attr('href', url)
                    .appendTo(desc);
            }
            return;
        }
        // relative urls are in nbextensions namespace
        url = require.toUrl(
            utils.url_path_join(
                base_url, 'nbextensions', utils.encode_uri_components(url)));
        // remove search component, as it's just a datestamp from require.js
        url = $('<a>').attr('href', url)[0].pathname;
        readme_title.text(url);
        // add rendered markdown to readme_contents. Use pre-fetched if present
        if (extension.readme_content) {
            rendermd.render_markdown(extension.readme_content, url)
                .addClass('rendered_html')
                .appendTo(readme_contents);
            return;
        }
        $.ajax({
            url: url,
            dataType: 'text',
            success: function (md_contents) {
                rendermd.render_markdown(md_contents, url)
                    .addClass('rendered_html')
                    .appendTo(readme_contents);
                // We can't rely on picking up the rendered html,
                // since render_markdown returns
                // before the actual rendering work is complete
                extension.readme_content = md_contents;
                if (! $('body').hasClass(page_class)) {
                    return;
                }
                // attempt to scroll to a location hash, if there is one.
                var hash = window.location.hash.replace(/^#/, '');
                if (hash) {
                    // Allow time for markdown to render
                    setTimeout( function () {
                        // use filter to avoid breaking jQuery selector syntax with weird id
                        var hdr = readme_contents.find(':header').filter(function (idx, elem) {
                            return elem.id === hash;
                        });
                        if (hdr.length > 0) {
                            var site = $('#site');
                            var adjust = hdr.offset().top - site.offset().top;
                            if (adjust > 0) {
                                site.animate(
                                    {scrollTop: site.scrollTop() + adjust},
                                    undefined, // time
                                    undefined, // easing function
                                    function () {
                                        if (hdr.effect !== undefined) {
                                            hdr.effect('highlight', {color: '#faf2cc'});
                                        }
                                    }
                                );
                            }
                        }
                    }, 100);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var error_div = $('<div class="text-danger bg-danger"/>')
                    .text(textStatus + ' : ' + jqXHR.status + ' ' + errorThrown)
                    .appendTo(readme_contents);
                if (jqXHR.status === 404) {
                    $('<p/>')
                        .text('no markdown file at ' + url)
                        .appendTo(error_div);
                }
            }
        });
    }