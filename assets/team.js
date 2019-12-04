

document.addEventListener("DOMContentLoaded", function (event) {  //waits for page load
    // Adunza API flow
    var appIdAdunza = "0fcdfab0"
    var appKeyAdunza = "982b3bccab3cc21e9dd73147b4926026"

    var resuts = [];
    var savedJobs = JSON.parse(localStorage.getItem("saved-jobs") || "[]");

    $("#search-btn").on("click", function (event) {

        //     // (in addition to clicks). Prevents the page from reloading on form submit.
        event.preventDefault();

        var queryURLadunza = "https://api.adzuna.com/v1/api/jobs/us/search/1?";
        var queryParamsadunza = {
            "app_id": appIdAdunza,
            "app_key": appKeyAdunza,
            "where": "baltimore",
            "results_per_page": 12,
            "what": "javascript",
            // "content-type": "application/json"
        };

        //     //Grab text the user typed into the search input, add to the queryParams object
        //     // queryParams.what = $("#search-input")
        //     //     .val()
        //     //     .trim();
        //     //Logging the URL so we have access to it for troubleshooting
        var queryURLadunza = queryURLadunza + $.param(queryParamsadunza);
        console.log("---------------\nURL: " + queryURLadunza + "\n---------------");

        //     // // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        //     // // The data then gets passed as an argument to the updatePage function
        $.ajax({
            url: queryURLadunza,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            results = response.results;

            var newContainer = $("<div>");
            newContainer.addClass("mdl-layout mdl-js-layout mdl-color--grey-100")
            var newMain = $("<main>");
            newMain.addClass("mdl-layout__content");
            var newGrid = $("<div>");
            newGrid.addClass("mdl-grid").attr('id', 'job-cards');

            $("#job-results").append(newContainer).append(newMain).append(newGrid);

            for (var i = 0; i < results.length; i++) {

                var newJob = $("<div>");
                newJob.attr("style", "margin: 20px; padding: 15px; background: whitesmoke;");
                newJob.addClass("demo-card-wide mdl-card mdl-shadow--2dp");
                var jobTitleDiv = $("<div>")
                var jobTitle = $("<p>")
                jobTitleDiv.addClass("mdl-card__title");
                jobTitle.addClass("mdl-card__title-text");
                jobTitle.attr("style", "font-size: 18px; font-weight: bold; text-align: center;");
                jobTitle.html(results[i].title);
                jobTitleDiv.append(jobTitle);


                var jobCompany = $("<h6>");
                jobCompany.text("Company: " + results[i].company.display_name);

                var jobInfo = $("<div>");
                jobInfo.addClass("mdl-card__supporting-text");
                jobInfo.html(results[i].description);

                var jobLinkDiv = $("<div>");
                jobLinkDiv.addClass("mdl-card__actions");
                var jobLink = $("<a />");
                jobLink.text("Details").attr("href", results[i].redirect_url);
                jobLink.attr("style", "color: dodgerblue; text-decoration: none;");
                jobLinkDiv.append(jobLink);

                var favoriteDiv = $("<div>");
                // favoriteDiv.addClass("mdl-card__actions");
                var buttonId = results[i].id;
                var favoriteBtn = $('<button/>', {
                    // text: 'Favorite',
                    id: 'btn-'+buttonId,
                    class: 'fav-btn'
                });
                favoriteBtn.addClass("mdl-button mdl-js-button mdl-button--icon mdl-button--colored");
                favoriteBtn.append("<i class=\"material-icons\">favorite_border</i>");
                favoriteDiv.append(favoriteBtn);

                //failed attempt to add mdl toggle switch. It won't work when called with qjuery
                // var favoriteLabel = $("<label>");
                // favoriteLabel.addClass("mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect").attr('for', buttonId);
                // favoriteLabel.append($("<input type=\"checkbox\" class=\"mdl-icon-toggle__input\" id=\"" + buttonId + "\" name=\"" + buttonId + "\">"));
                //     // $('<input type="checkbox">').attr({id: buttonId, name: buttonId});
                // // favoriteBtn.addClass("mdl-icon-toggle__input");
                // // favoriteBtn.appendTo(favoriteLabel);
                // favoriteLabel.append("<i class=\"mdl-icon-toggle__label material-icons\">favorite</i>");
                // favoriteLabel.append("<span class=\"mdl-icon-toggle__ripple-container mdl-js-ripple-effect mdl-ripple--center\" data-upgraded=\",MaterialRipple\"><span class=\"mdl-ripple is-animating\" style=\"width: 103.823px; height: 103.823px; transform: translate(-50%, -50%) translate(18px, 18px);\"></span></span>");
                // favoriteDiv.append(favoriteLabel);

                newJob.append(jobTitleDiv).append(jobCompany).append(jobInfo).append(jobLinkDiv).append(favoriteDiv);
                $("#job-cards").append(newJob);
            }


        });
    });


    //saved job on favorite click
    $(document).on('click', 'button.fav-btn', function(event) {
        event.preventDefault();
        console.log(this);
        var jobID = $(this).attr("id").slice(3);
        $(this).find('i').text('favorite');
        // this.html("<i class=\"material-icons\">favorite</i>");
        for (var i = 0; i < results.length; i++) {
            if ( results.id === jobID) {
                savedJobs.push(results[i]);

            }
        }        
            // return false;
     });

    // $(".fav-btn").on("click", function (event) {
    //     event.preventDefault();
    //     console.log(this);
    //     var jobID = $(this).slice(3, attr("id"));
    //     $(this).find('i').text('favorite');
    //     // this.html("<i class=\"material-icons\">favorite</i>");
    //     for (var i = 0; i < results.length; i++) {
    //         if ( results.id === jobID) {
    //             savedJobs.push(results[i]);

    //         }
    //     }
    // });

//BLS API for employment data
    $("#search-btn").on("click", function (event) {

        // (in addition to clicks). Prevents the page from reloading on form submit.
        event.preventDefault();

        //BLS codes Industry: 511200 software publishers, Job series 151130 Software developers and programmers
        //Note, only have 2018 data for most series
        //             datatype_code	datatype_name
        // 01	Employment
        // 02	Employment percent relative standard error
        // 03	Hourly mean wage
        // 04	Annual mean wage
        // 05	Wage percent relative standard error
        // 06	Hourly 10th percentile wage
        // 07	Hourly 25th percentile wage
        // 08	Hourly median wage
        // 09	Hourly 75th percentile wage
        // 10	Hourly 90th percentile wage
        // 11	Annual 10th percentile wage
        // 12	Annual 25th percentile wage
        // 13	Annual median wage
        // 14	Annual 75th percentile wage
        // 15	Annual 90th percentile wage
        // 16	Employment per 1,000 jobs
        // 17	Location Quotient

        var queryURLBLS = "https://api.bls.gov/publicAPI/v1/timeseries/data/";
        var seriesIDBLS = "OEUN000000051120015113013"

        var queryURLBLS = queryURLBLS + seriesIDBLS;
        console.log("---------------\nURL: " + queryURLBLS + "\n---------------");

        $.ajax({
            url: queryURLBLS,
            method: 'GET',
            // headers: {
            //     // "Host": host,
            //     // "User-Agent": userAgent,
            //     "Authorization-Key": authKey,
            // }
        }).then(function (response) {
            console.log(response);
            // var data = JSON.parse(body);  
        });

    });

    var queryURL = 'https://newsapi.org/v2/everything?' +
    'qInTitle=coding%20OR%20(software%20development)&' +
    'sortBy=popularity&' +
    'apiKey=e011fc0c8f0d40038e7cf2dd4acb67ff';

console.log(queryURL);

// $.ajax({
//     url: queryURL,
//     method: "GET"
// })

// .then(function (response) {
//     console.log(response);



//     for (var i = 0; i < 8; i++) {
//         var newTitle = $("<a>");
//         newTitle.attr("href", response.articles[i].url);
//         newTitle.attr("target", "_blank");
//         newTitle.attr("class", "articleTitleText");
//         newTitle.attr("style", "color: black; font-weight: bold;");
//         newTitle.text(i+1 + ". " + response.articles[i].title);
//         var description = $("<p>");
//         description.text(response.articles[i].description);
//         $("#newsList").append(newTitle);
//         $("#newsList").append(description);
//     }

// });



    // OTHER APIs 
    //     //Authenticjob API flow
    // var appKeyAuthenJobs = "fac0ec7c2a95cae17ed197bb9b3ad80a"

    // $("#search-btn").on("click", function (event) {

    //     // (in addition to clicks). Prevents the page from reloading on form submit.
    //     event.preventDefault();

    //     var queryURL = "https://authenticjobs.com/api/?";
    //     var queryParams = {
    //         "api_key": appKeyAuthenJobs,
    //         "method": "aj.jobs.search",
    //         "perpage": 10,
    //           "telecommuting" : 1,
    //         "keywords": "javascript",
    //         // "location" : "baltimoremdus",
    //         "format" : "json"
    //     };

    //     //Grab text the user typed into the search input, add to the queryParams object
    //     // queryParams.what = $("#search-input")
    //     //     .val()
    //     //     .trim();
    //     //Logging the URL so we have access to it for troubleshooting
    //     var queryURL = queryURL + $.param(queryParams);
    // console.log("---------------\nURL: " + queryURL + "\n---------------");
    //     console.log(queryURL) //+ $.param(queryParams));
    //     // var queryURL = queryURL

    //     // // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    //     // // The data then gets passed as an argument to the updatePage function
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function (response) {
    //         console.log(response);
    //     });

    //USAJobs API flow

    // $("#search-btn").on("click", function (event) {

    //     // (in addition to clicks). Prevents the page from reloading on form submit.
    //     event.preventDefault();

    //     // var request = require('request');  

    //     var host = 'data.usajobs.gov';
    //     var userAgent = 'alexnzook@gmail.com';
    //     var authKey = "czAWXom+IFWJoDXYE7+wbOUdpQIIx/HCZr4nEqy+h/g=";


    //         //USA Job codes: 0854: computer eng, 1550: computer sci., 2210: IT management
    //     var queryURL = "https://data.usajobs.gov/api/search?J";
    //         var queryParams = {
    //             "JobCategoryCode": 1550,
    //             "Keyword": "javascript",
    //             "LoactionName": "Baltimore, MD"
    //         };
    //                 var queryURL = queryURL + $.param(queryParams);
    //                 console.log("---------------\nURL: " + queryURL + "\n---------------");

    //     $.ajax({
    //         url: queryURL,
    //         method: 'GET',
    //         headers: {
    //             // "Host": host,
    //             // "User-Agent": userAgent,
    //             "Authorization-Key": authKey,
    //         }
    //     }).then(function (response) {
    //         console.log(response);
    //         // var data = JSON.parse(body);  
    //     });

    // });

});
