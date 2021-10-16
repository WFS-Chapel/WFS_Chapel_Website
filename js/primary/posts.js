var delayInMilliseconds = 250; //1 second

var rendered = "False"

try {
    setTimeout(function() {
        while (rendered != "True") {
            fetch("https://spreadsheets.google.com/feeds/cells/1bSuGlrnHjj9kh23c0_-YZN8T0UDPMlhBbAF8KcQK6MI/1/public/full?alt=json")
            .then(response => response.json())
            .then(data => {
                console.log("Trying")
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
                }, delayInMilliseconds);     
            })
        var rendered = "True"
        }
    }, delayInMilliseconds);
} catch (error) {
    location.reload()
}