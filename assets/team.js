// Adunza
//regional job numbers 
// url: http://api.adzuna.com/v1/api/jobs/gb/history?app_id={YOUR API ID}&app_key={YOUR API KEY}&location0=UK&location1=West%20Midlands&content-type=application/json

// Application ID: 0fcdfab0
// 	Application Key: 982b3bccab3cc21e9dd73147b4926026



document.addEventListener("DOMContentLoaded", function (event) {  //waits for page load
    
    var appIdAdunza = "0fcdfab0"
    var appKeyAdunza = "982b3bccab3cc21e9dd73147b4926026"

    $("#search-btn").on("click", function (event) {

        searchTerm = $("#search-input")
        .val()
        .trim();
        // (in addition to clicks). Prevents the page from reloading on form submit.
        event.preventDefault();
               var queryURL = "https://api.adzuna.com/v1/api/jobs/us/history?";
        var queryParams = {
            "app_id": appIdAdunza,
            "app_key": appKeyAdunza,
            "location0": searchTerm
        };

        // Grab text the user typed into the search input, add to the queryParams object
        // queryParams.q = $("#city-input")
        //     .val()
        //     .trim();
        // Logging the URL so we have access to it for troubleshooting
        // console.log("---------------\nURL: " + queryURL + "\n---------------");
        // console.log(queryURL + $.param(queryParams));
        // var queryURL = queryURL + $.param(queryParams);
        // var queryURL = queryURL

        // // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        // // The data then gets passed as an argument to the updatePage function
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
console.log(response);
        });

    }):
}):