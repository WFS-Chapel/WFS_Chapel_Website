var try_num = 1
var delayInMilliseconds = 500;
function getVarFromUrl(url) { return url.match(/[?](.*)/)[1]; }
var Post = getVarFromUrl(window.location.href)

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
    var data = data[0].sermons
    const Posts = []
    
    var first_row = 1
    var last_row = data.length

    for (let step = first_row; step < last_row; step += 1) {
        var Identifier = data[step][0]
        var Identifier = {
            Identifier: data[step][0],
            Date: data[step][1],
            VideoLink: data[step][2],
            Title: data[step][3],
            SubTitle: data[step][4],
            Transcript: data[step][5],
            Chaplain: data[step][6],
            Ushers: data[step][7],
            Readers: data[step][8]
        };
        Posts.push(Identifier)
    }
    console.log(Posts)



    for (let num = 0; num < Posts.length; num++) {
        var Current_Identifier = Posts[num].Identifier
        
        if (Post == Current_Identifier) {
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
            
            var added_info = "<img class='img-fluid rounded-circle' src='assets/person.png' alt='" + Chaplain + "' /><div class='ms-3'><div class='fw-bold'>" + Chaplain + "</div></div>"
            document.querySelector("#post-1").innerHTML = added_info
            
            var added_post = "<!-- Post header--><header class='mb-4'><!-- Post title--><h1 class='fw-bolder mb-1'>" + Title + "</h1><!-- Post meta content--><div class='text-muted fst-italic mb-2'>" + Day + ", " + Month_Year + "</div><!-- Post categories--></header><!-- Preview image figure--><figure class='mb-4'><a href='" + VideoLink + "' class='overflow rounded'><img class='img-fluid rounded thumbnail' src='" + VideoPhoto + "' alt='" + Title + "' style='width:900px;'/><p>Above is the YT Link</p></a></figure><!-- Post content--><section class='mb-5'><p class='fs-5 mb-4'>" + SubTitle + "</p><h2 class='fw-bolder mb-4 mt-5'>Transcript</h2><p class='fs-5 mb-4'>" + Transcript + "</p></section>"
            document.querySelector("#post-2").innerHTML = added_post
            
        }
    }

    // General //

}

window.onload = function() {
    start()
}

