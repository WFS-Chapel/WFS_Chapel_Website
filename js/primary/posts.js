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
    // SERMONS //
    var data_1 = data[0].sermons
    const Posts = []
    
    var first_row = 1
    var last_row = data_1.length

    for (let step = first_row; step < last_row; step += 1) {
        var Identifier = data_1[step][0]
        var Identifier = {
            Identifier: data_1[step][0],
            Date: data_1[step][1],
            VideoLink: data_1[step][2],
            Title: data_1[step][3],
            SubTitle: data_1[step][4],
            Transcript: data_1[step][5],
            Chaplain: data_1[step][6],
            Ushers: data_1[step][7],
            Readers: data_1[step][8]
        };
        Posts.push(Identifier)
    }
    console.log(Posts)


    for (let num = 0; num < Posts.length; num++) {
        // JSON
        var Identifier = Posts[num].Identifier
        var Date = Posts[num].Date
        var VideoLink = Posts[num].VideoLink
        var Title = Posts[num].Title
        var SubTitle = Posts[num].SubTitle
        var Transcript = Posts[num].Transcript
        var Chaplain = Posts[num].Chaplain
        var Ushers = Posts[num].Ushers
        var Readers = Posts[num].Readers
        
        // Local
        // dates
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const raw_date = Date.split("/")
        var Day = raw_date[0]
        var Month_Year = (months[(raw_date[1]-1)] + " " + raw_date[2])
        
        // photos
        function getIdFromUrl(url) { 
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            return (match&&match[7].length==11)? match[7] : false;
        }
        
        var VideoPhoto = ("http://img.youtube.com/vi/" + getIdFromUrl(VideoLink) + "/mqdefault.jpg")
        
        var added_post = "<div class='col-lg-6'><div class='position-relative mb-5'><img class='img-fluid rounded-3 mb-3' src='" + VideoPhoto + "' alt='" + Title + "' style='width:600px' /><a class='h3 fw-bolder text-decoration-none link-dark stretched-link' href='post.html?" + Identifier + "'>" + Title + "</a></div></div>"
        document.querySelector("#posts").innerHTML += added_post
    }

    // General //
    var data_2 = data[0].general

    var first_row = 12
    var num = 0
    while (data_2[first_row + num][0] == "sections") {
        num += 1
    }
    var last_row = first_row + num

    // Get start of first general
    var first_row_of_sermons = last_row + 1
    document.querySelector("#title").innerHTML = data_2[first_row_of_sermons][1]
    document.querySelector("#subtitle").innerHTML = data_2[first_row_of_sermons+1][1]
    //console.log("Done")
}

window.onload = function() {
    start()
}