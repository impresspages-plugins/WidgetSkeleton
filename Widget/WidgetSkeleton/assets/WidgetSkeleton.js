/**
 * @package ImpressPages
 *
 */

var IpWidget_WidgetSkeleton = function () {

    this.widgetObject = null;
    this.confirmButton = null;
    this.data = {};

    this.init = function (widgetObject, data) {

        this.widgetObject = widgetObject;
        this.data = data;

        this.widgetObject.css('min-height', '30px');


        var context = this; // set this so $.proxy would work below


        //put an overlay over the widget and open popup on mouse click event
        this.$widgetOverlay = $('<div></div>');
        this.widgetObject.prepend(this.$widgetOverlay);
        this.$widgetOverlay.on('click', $.proxy(openPopup, this));
        $.proxy(fixOverlay, context)();

        //fix overlay size when widget is resized / moved
        $(document).on('ipWidgetResized', function () {
            $.proxy(fixOverlay, context)();
        });
        $(window).on('resize', function () {
            $.proxy(fixOverlay, context)();
        });

    };


    var fixOverlay = function () {
        this.$widgetOverlay
            .css('position', 'absolute')
            .css('z-index', 1000) // should be higher enough but lower than widget controls
            .width(this.widgetObject.width())
            .height(this.widgetObject.height());
    }


    /**
     * Automatically open settings popup when new widget added
     */
    this.onAdd = function () {
        $.proxy(openPopup, this)();
    };

    var openPopup = function () {
        var context = this;
        $('#ipWidgetSkeletonPopup').remove(); //remove any existing popup.

        //get popup HTML using AJAX
        var data = {
            aa: 'WidgetSkeleton.widgetPopupHtml',
            securityToken: ip.securityToken,
            widgetId: this.widgetObject.data('widgetid')
        }

        $.ajax({
            url: ip.baseUrl,
            data: data,
            dataType: 'json',
            type: 'GET',
            success: function (response) {
                //create new popup
                var $popupHtml = $(response.popup);
                $('body').append($popupHtml);
                var $popup = $('#ipWidgetSkeletonPopup .ipsModal');
                $popup.modal();
                ipInitForms();
                $popup.find('.ipsConfirm').on('click', function(e){e.preventDefault(); $popup.find('form').submit();});
                $popup.find('form').on('ipSubmitResponse', $.proxy(save, context));
            },
            error: function (response) {
                alert('Error: ' + response.responseText);
            }

        });



    };

    var save = function (e, response) {
        this.widgetObject.save(response.data, 1); // save and reload widget
        var $popup = $('#ipWidgetSkeletonPopup .ipsModal');
        $popup.remove();
    };

};

