(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    $.extend($.summernote.plugins, {
        'bootstrap-grid': function (context) {
            var ui = $.summernote.ui;

            // add bootstrap-grid button
            context.memo('button.bootstrap-grid', function () {
                // create button
                var button = ui.buttonGroup([
                    ui.button({
                        className: 'dropdown-toggle',
                        contents: '<i class="fa fa-th"/>',
                        tooltip: "Columns",
                        data: {
                            toggle: 'dropdown'
                        }
                    }),
                    ui.dropdown({
                        className: 'dropdown-menu',
                        contents:
                        "<li class=\"dropdown-item\"><a href=\"#\" class=\"dropdown-item\" data-colclass=\"6\" data-colcount=\"2\">2 columns</a></li>" +
                        "<li class=\"dropdown-item\"><a href=\"#\" class=\"dropdown-item\" data-colclass=\"4\" data-colcount=\"3\">3 columns</a></li>" +
                        "<li class=\"dropdown-item\"><a href=\"#\" class=\"dropdown-item\" data-colclass=\"3\" data-colcount=\"4\">4 columns</a></li>" +
                        "<li class=\"dropdown-item\"><a href=\"#\" class=\"dropdown-item\" data-colclass=\"2\" data-colcount=\"6\">6 columns</a></li>",
                        callback: function ($dropdown) {
                            $dropdown.find('li a').each(function () {
                                $(this).click(function() {
                                    var colCount = $(this).data().colcount,
                                        colClass = $(this).data().colclass,
                                        row = document.createElement('div');

                                    row.className = 'row';

                                    for(var i = 0; i < colCount; i++){
                                        var col = document.createElement('div'),
                                            p = document.createElement('p');
                                        col.className = 'col-md-'+colClass;
                                        p.innerHTML = "column";

                                        col.appendChild(p);
                                        row.appendChild(col);
                                    }

                                    context.invoke("editor.pasteHTML", row.outerHTML);

                                    return false;
                                });
                            });
                        }
                    })
                ]).render();

                return button;
            });
        }
    });
}));
