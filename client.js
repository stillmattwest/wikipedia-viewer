$(document).ready(function () {

    function loadPage(title) {
        var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&rvprop=content&titles=" + title + "&callback=?";
        if (title === 'random') {
            url = 'https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&format=json&callback=?';
        }
        var queryData = "";
        $.ajax({
            url: url,
            data: queryData,
            dataType: 'json',
            success: function (data) {
                var pages = data.query.pages;
                for (var id in pages) {
                    if (pages[id].extract) {
                        $('#page-content').html('<h2>' + pages[id].title + '</h2>');
                        $('#page-content').append(pages[id].extract);
                    } else {
                        $('#page-content').html('<h2>' + pages[id].title + '</h2>');
                        $('#page-content').append('<p>This topic does not appear to have a Wikipedia Article associated with it, please try a different search</p>');
                    }
                }
            }
        });
    }


    $("#search").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "http://en.wikipedia.org/w/api.php",
                dataType: "jsonp",
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': request.term
                },
                success: function (data) {
                    response(data[1]);
                }
            });
        },
        delay: 100
    });

    $("#search-btn").click(function () {
        var title = $("#search").val();
        loadPage(title);
        return false;
    });

    $("#random").click(function () {
        loadPage('random');
    })
});