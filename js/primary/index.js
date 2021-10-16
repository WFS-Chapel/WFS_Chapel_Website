var delayInMilliseconds = 250; //1 second



var rendered = "False"

try {
    setTimeout(function() {
        while (rendered != "True") {
            fetch("https://spreadsheets.google.com/feeds/cells/1bSuGlrnHjj9kh23c0_-YZN8T0UDPMlhBbAF8KcQK6MI/1/public/full?alt=json")
            .then(response => response.json())
                .then(data => {
                    setTimeout(function() {
                        ////Posts
                        // SET LETS
                        let raw_cells = data.feed.entry
                        // SET VARIABLES
                        const Posts = []
                        var len_post_attributes = 9
                        var start_num_posts = 9
                        var end_num_posts = Object.keys(raw_cells).length
                        
                        for (let step = start_num_posts; step < end_num_posts; step += len_post_attributes) {
                            var Identifier = raw_cells[step].content.$t
                            var Identifier = {
                                Identifier: raw_cells[step].content.$t,
                                Date: raw_cells[step+1].content.$t,
                                VideoLink: raw_cells[step+2].content.$t,
                                Title: raw_cells[step+3].content.$t,
                                SubTitle: raw_cells[step+4].content.$t,
                                Transcript: raw_cells[step+5].content.$t,
                                Chaplain: raw_cells[step+6].content.$t,
                                Ushers: raw_cells[step+7].content.$t,
                                Readers: raw_cells[step+8].content.$t,
                            };
                            Posts.push(Identifier)
                        }
                        console.log(Posts)
                        
                
                        
                        for (let num = 0; num < Posts.length; num++) {
                            if (num < 3) {
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
                                
                                var added_post = "<div class='col-lg-4 mb-5'><div class='card h-100 shadow border-0'><img class='card-img-top' src='" + VideoPhoto + "' alt='" + Title + "' /><div class='card-body p-4'><a class='text-decoration-none link-dark stretched-link' href='post.html?" + Identifier + "'><h5 class='card-title mb-3'>" + Title + "</h5></a><p class='card-text mb-0'>" + SubTitle + "</p></div><div class='card-footer p-4 pt-0 bg-transparent border-top-0'><div class='d-flex align-items-end justify-content-between'><div class='d-flex align-items-center'><img class='rounded-circle me-3' src='https://dummyimage.com/40x40/ced4da/6c757d' alt=" + Chaplain + " /><div class='small'><div class='fw-bold'>" + Chaplain + "</div><div class='text-muted'>" + Day + ", " + Month_Year + "</div></div></div></div></div></div></div>"
                                document.querySelector("#posts").innerHTML += added_post
                            }
                        }
                    }, delayInMilliseconds);     
                })
            var rendered = "True"
        }
    }, delayInMilliseconds);
} catch (error) {
    location.reload()
}





/*

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
            fetch_data('https://script.google.com/macros/s/AKfycbzb1Wvwmid6B23TD7z3EQjpbbqmdy90g5bIGNOLz1uPDbZlzYZxW_j_hBMKzelmOqtI/exec')
        }
    }, delayInMilliseconds)
}

function main(data) {
    
    const Headings = ["Alumni", "Teacher", "Student", "Volume"]

    try {
        var Var = getVarFromUrl(window.location.href)
        for (var i = 0; i < Headings.length; i++) {
            if (Var == Headings[i]) {
                const children = document.querySelector(".blog-heading").children;
                for (var j = 0; j < children.length; j++) {
                    if (children[j].innerText == Headings[i]) {
                        document.querySelector(".blog-heading").children[j].innerText = Headings[i]
                        var Current_Heading = Headings[i]
                    }
                }
            }
        }
    } catch (error) {
        const children = document.querySelector(".blog-heading").children;
        for (var j = 0; j < children.length; j++) {
            if (children[j].innerText == "All") {
                document.querySelector(".blog-heading").children[j].innerText = children[j].innerText
                var Current_Heading = "All"
            }
        }
    }
    
    ////Posts
    // SET LETS
    var data = data[0].data
    // SET VARIABLES
    const Posts = []
    
    var first_row = 46
    var last_row = data.length
    

    for (let step = first_row; step < last_row; step += 1) {
        var Identifier = data[step][0]
        var Identifier = {
            Identifier: data[step][0],
            Date: data[step][1],
            Title: data[step][2],
            SubTitle: data[step][3],
            Type: data[step][4],
            HexadecimalColor: data[step][5],
            FrontPhoto: data[step][6],
            Photo1: data[step][7],
            Content: data[step][8],
            Author: data[step][9],
            AuthorEmail: data[step][10]
        };
        Posts.push(Identifier)
    }
    

    // Main Content
    for (let num = 0; num < Posts.length; num++) {
        // JSON
        var Current_Identifier = Posts[num].Identifier
        var Date = Posts[num].Date
        var Title = Posts[num].Title
        var SubTitle = Posts[num].SubTitle
        var Type = Posts[num].Type
        var HexadecimalColor = Posts[num].HexadecimalColor
        var FrontPhoto = Posts[num].FrontPhoto
        var Photo1 = Posts[num].Photo1
        var Content = Posts[num].Content
        var Author = Posts[num].Author
        var AuthorEmail = Posts[num].AuthorEmail

        // Local
        // dates
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const raw_date = Date.split("/")
        var Day = raw_date[0]
        var Month_Year = (months[(raw_date[1]-1)] + " " + raw_date[2])

        // photos
        function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }
        var FrontPhoto = ("https://drive.google.com/uc?id=" + getIdFromUrl(FrontPhoto))
        
        var added_post = "<article class='media blog-post wow fadeInUp'><a href='post.html?" + Current_Identifier + "'><img src='" + FrontPhoto + "' alt='" + Title + "' class='blog-post-thumbnail'></a><div class='media-body'><a href='post.html?" + Current_Identifier + "'><h5 class='blog-post-title'>" + Title + "</h5></a><p class='blog-post-excerpt'>" + SubTitle + "</p><a href='post.html?" + Current_Identifier + "' class='blog-post-link link-hover-fx text-decoration-none'>Read more</a> &middot; " + Day + ", " + Month_Year + "</div></article>"

        if (Current_Heading == "All") {
            document.querySelector("#posts").innerHTML += added_post
        } else if (Current_Heading == Posts[num].Type) {
            document.querySelector("#posts").innerHTML += added_post
        }
    }
}

window.onload = function() {
    start()
}



*/