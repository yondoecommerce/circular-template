var PortfolioTemplates = {
    VideoTemplate: function (assetInfo) {
        var result = "";

        if (assetInfo.Error)
            result = 
                "<a href='" + assetInfo.VideoUrl + "'>" +
                    "<div class='image-container'>" +
                        "<img style='width: 100px;height: 100px;'/>" +
                        "<div>" + assetInfo.Error + "</div>" +
                        "<div class='play-button' style='top:40% !important'>" +
                            "<i class='fa fa-play fa-2x'></i>" +
                        "</div>" +
                    "</div>" +
                "</a>" +
                "<div>" + assetInfo.Title + "</div>";
        else
            result = 
                "<a href='" + assetInfo.VideoUrl + "'>" +
                    "<div class='image-container'>" +
                        "<img src='" + assetInfo.ThumbSrc + "' />" +
                        "<div class='play-button'>" +
                            "<i class='fa fa-play fa-2x'></i>" +
                        "</div>" +
                    "</div>" +
                "</a>" +
                "<div>" + assetInfo.Title + "</div>";


        return result;
    }
};

var Contains = function(it) { return this.indexOf(it) != -1; };

$('.video-preview.loading').each(function() {
    var endpoint = "/api/OEmbed" + '?url=' + encodeURIComponent($(this).data('videourl'));
    var element = this;
    $.ajax({
        url: endpoint,
        dataType: 'json',
        success: function (data) {
            var assetInfo = {
                VideoUrl: $(element).data('videourl'),
                Description: data.description,
                ThumbSrc: data.thumbnail_url,
                Html: data.html,
                Title: data.title
            };
            
            result = PortfolioTemplates.VideoTemplate(assetInfo);
            $(element).html(result);
        },
        error: function (data) {
            var assetInfo = {
                VideoUrl: $(element).data('videourl'),
                Error: "Unable to load preview"
            };
            
            result = PortfolioTemplates.VideoTemplate(assetInfo);
            $(element).html(result);
        },
        complete: function (data) {
            $('.video-preview > a').magnificPopup({
                type: 'iframe'
            });
        }

    });
});

$('.image-preview > a').magnificPopup({
    type: 'image' 
});