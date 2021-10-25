var try_num = 1
var delayInMilliseconds = 500;
function getVarFromUrl(url) { return url.match(/[?](.*)/)[1]; }

function fetch_data(url) {
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else if(response.status === 404) {
            return Promise.reject('error 404')
        } else {
            return Promise.reject('some other error: ' + response.status)
        }
    })
    .then(data => main(data))
    .catch(error => start());
}

function start() {
    setTimeout(function() {
        if (try_num >= 1) {
            try_num -= 1
            fetch_data('https://script.google.com/macros/s/AKfycbzv9xghckHaLccdSatUqdAoDYSr5VEaJi_FtCr-yEAdV2m1gqSSR2jnxrDHuMmIQ-os/exec')
        }
    }, delayInMilliseconds)
}

function main(data) {
    // SET VARIABLES
    // General //
    var data_2 = data[0].general
    console.log(data_2)
    document.querySelector("#title").innerHTML = data_2[7][1]
    document.querySelector("#subtitle").innerHTML = data_2[8][1]
    document.querySelector("#title_2").innerHTML = data_2[7][1]
    document.querySelector("#subtitle_2").innerHTML = data_2[8][1]
    document.querySelector("#about_sections").innerHTML = ""

    
    var first_row = 12
    
    // Find last row
    var num = 0
    while (data_2[first_row + num][0] == "sections") {
        num += 1
    }
    var last_row = first_row + num

    var number = 2
    for (let step = first_row; step < last_row; step += 1) {
        
        var title = data_2[step][1]
        var link = data_2[step][2]
        var bullets = ""
        
        content_it = 3
        while (content_it < data_2[step].length) {
            if (data_2[step][content_it] != "") {
                bullets += "<li>" + data_2[step][content_it] + "</li>"
            }
            content_it += 1
        }

        if (number % 2 == 0) {
            document.querySelector("#about_sections").innerHTML += "<section class='py-5 bg-light' id='scroll-target'><div class='container px-5 my-5'><div class='row gx-5 align-items-center'><div class='col-lg-6'><img class='img-fluid rounded mb-5 mb-lg-0' src=" + link + " alt=" + title + " /></div><div class='col-lg-6'><h2 class='fw-bolder'>" + title + "</h2><p class='lead fw-normal text-muted mb-0'><ul>" + bullets + "</ul></p></div></div></div></section>"
        } else {
            document.querySelector("#about_sections").innerHTML += "<section class='py-5'><div class='container px-5 my-5'><div class='row gx-5 align-items-center'><div class='col-lg-6 order-first order-lg-last'><img class='img-fluid rounded mb-5 mb-lg-0' src=" + link + " alt=" + title + " /></div><div class='col-lg-6'><h2 class='fw-bolder'>" + title + "</h2><p class='lead fw-normal text-muted mb-0'><ul>" + bullets + "</ul></p></div></div></div></section>"
        }
        number += 1

    }
}

window.onload = function() {
    start()
}