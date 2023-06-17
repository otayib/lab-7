let btnXHR = document.getElementById('xhrSearch');
let btnFetch = document.getElementById('fetchSearch');
let btnAsync = document.getElementById('AsyncAwaitSearch');

let searchQuere = document.getElementById("query");
let searchResults = document.getElementById("Searchresults");

var url = "https://api.giphy.com/v1/gifs/search";
var apiKey = "bOd7Gk3aLsFTUKOeSsQRXcD1juL2pgSH" 

btnXHR.addEventListener("click", function () {
    searchResults.innerHTML = "";
    search_UsingXHR(searchQuere.value);
});

btnFetch.addEventListener("click", function () {
    searchResults.innerHTML = "";
    search_UsingFetch(searchQuere.value);
});

btnAsync .addEventListener("click", function (){

    searchResults.innerHTML = "";
    search_Using_FetchAsyncAwait(searchQuere.value)
    .catch((e) => {
        console.error(e);
    });
});

//2) XHR
function search_UsingXHR(query) {
    if (!query || query.trim().length == 0) {
        return;
    }
    var xhr = new XMLHttpRequest();
    var params = "api_key=" + apiKey + "&limit=5&rating=g&q=" +encodeURIComponent(query);
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            processResponse(JSON.parse(this.responseText));
        }
    });
    xhr.open("GET", url + "?" + params);
    xhr.send();

}

 
function search_UsingFetch(query) {
    if (!query || query.trim().length == 0) {
        return;
    }
    var params = "api_key=" + apiKey + "&limit=5&rating=g&q=" +encodeURIComponent(query);
    var requestOptions = {
        method: 'GET'
    };
    fetch(url + "?" + params, requestOptions)
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            processResponse(JSON.parse(data))
        })
        .catch((e) => {
            console.error(e);
        })
}

//3) fetch AsyncAwait
async function search_Using_FetchAsyncAwait(query) {
    if (!query || query.trim().length == 0) {
        return;
    }
    var params = "api_key=" + apiKey + "&limit=5&rating=g&q=" +encodeURIComponent(query);
    var requestOptions = {
        method: 'GET'
    };
    
    const response = await fetch(url + "?" + params, requestOptions); 
    const data = await response.json();
    processResponse(data);
}

function processResponse(resp) {
    for (item of resp.data) {
        let imgElement = document.createElement("img");
        imgElement.src = item.images.downsized_medium.url;
        imgElement.alt = item.title;
        searchResults.appendChild(imgElement);
    }
}