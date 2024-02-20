console.log("xhr_script.js loaded");

// get the button for xhr
let btn_xhr = $('#xhrJoke');

// create a url variable
let url_xhr = "https://icanhazdadjoke.com/";

// create a click callback that handles the API call
$(btn_xhr).click(() => {
    // instantiate an XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // configure with open()
    xhr.open("GET", url_xhr);
    // set the necessary headers for icanhazdadjoke.com
    xhr.setRequestHeader("Accept", "application/json")
    // create the callback to handle the onreadystatechange
    xhr.onreadystatechange = function() {
            // only execute when done and status is 200
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
             // get the responseText
             let joke = xhr.responseText;
            // console log
            console.log(joke);
            // SHOW OUTPUT IN THE OUTPUT BOX
            // JSON.parse the joke
            // set the output
            }
    }

    // send the request
    xhr.send();
})



