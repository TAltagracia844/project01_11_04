/*  Project 01_11_04

    Author: Tiffany Altagracia
    Date:   9.7.18

    Filename: script.js
*/

"use strict";

//Global Variables
var httpRequest = false;
var countrySel = null;

function checkButtons() {
    //test to see if function runs
    //alert("checkButtons()");
    var germany = document.getElementById("germany");
    var us = document.getElementById("us");
//updates global variable
    if(germany.checked || us.checked){
        document.getElementById('zipset').style.visibility = "visible";
        if(germany.checked){
            countrySel = "de";
        }
        else{
            countrySel = "us";
        }
    }
}

// Function named checkInput 
function checkInput() {
    //Alert will fire when a key is released
    // alert("checkInput()");

    //Checks length of the zip code and if it is correct getLocation() will run
    var zip = document.getElementById("zip").value;
    if (zip.length === 5) {
        getLocation();
    } else {
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
    }
}

function getLocation() {
    //Debugging technique to see if the function runs
    //console.log("getLocation()");
    var zip = document.getElementById("zip").value;
    //Gets XHR Objects 
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    // Generate AJAX request
    httpRequest.abort();
    httpRequest.open("get", "http://api.zippoptam.us/" +  countrySel + "/" + zip, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var resultData = JSON.parse(httpRequest.responseText);
        // test to see if variable works
        // console.log(resultData);
        // Gathers data and places it in the dom
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        city.value = resultData.places[0]["place name"];
        state.value = resultData.places[0]["state abbreviation"];
        document.getElementById("zip").blur();
        document.getElementById("csset").style.visibility = "visible";
    }
}

function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        // Allows user to complete the form manually
        document.getElementById("zipset").style.visibility = "visible";
        document.getElementById("csset").style.visibility = "visible";
        var zip = document.getElementById("zip").value;
        if (zip.addEventListener) {
            zip.addEventListener("keyup", checkInput, false);
germany.removeEventListener
        } else if (zip.attachEvent) {
            zip.detachEvent("onkeyup", checkInput);
        }

        return false;
    }
    //test function
    // console.log(httpRequest);
    return httpRequest;
}


// Event Listener 
// global variable
var zip = document.getElementById("zip");
if (zip.addEventListener) {
    zip.addEventListener("keyup", checkInput, false);
} else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}
//global variable
var germany = document.getElementById("germany");
var us = document.getElementById("us");
if (us.addEventListener) {
    germany.addEventListener("click", checkButtons, false);
    us.addEventListener("click", checkButtons, false);
} else if (us.attachEvent) {
    germany.attachEvent("onclick", checkButtons);
    us.attachEvent("onclick", checkButtons);

}