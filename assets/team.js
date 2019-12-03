var queryURL = 'https://newsapi.org/v2/everything?' +
    'q=coding&' +
    'q=careers&' +
    'sortBy=popularity&' +
    'apiKey=e011fc0c8f0d40038e7cf2dd4acb67ff';
$.ajax({
    url: queryURL,
    method: "GET"
})

    .then(function (response) {
        console.log(response);



        for (var i = 0; i < 8; i++) {
            var newTitle = $("<a>");
            newTitle.attr("href", response.articles[i].url);
            newTitle.attr("target", "_blank");
            newTitle.attr("class", "articleTitleText");
            newTitle.attr("style", "color: black; font-weight: bold;");
            newTitle.text(i+1 + ". " + response.articles[i].title);
            var description = $("<p>");
            description.text(response.articles[i].description);
            $("#newsList").append(newTitle);
            $("#newsList").append(description);
        }

    });
