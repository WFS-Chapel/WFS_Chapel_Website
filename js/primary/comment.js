function getPostFromUrl(url) { return url.match(/[?](.*)/)[1]; }
var Post = getPostFromUrl(window.location.href)

function Randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

var today = new Date();
var date = (today.getDate()) + '/' + (today.getMonth()+1) + '/' + (today.getFullYear())

const icons = ["Abiu", "Açaí", "Acerola", "Ackee", "African cucumber", "Apple", "Apricot", "Avocado", "Banana", "Bilberry"]


// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC5fJwem8tKmECagqzVIt13HxVDO_YEzis",
    authDomain: "comments-59bb7.firebaseapp.com",
    projectId: "comments-59bb7",
    storageBucket: "comments-59bb7.appspot.com",
    messagingSenderId: "218924352254",
    appId: "1:218924352254:web:69f0c78503ea41aa64dbaf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database()

// Load Firebase
async function get() {
    const snapshot = await database.ref('comments/').once('value')
    return snapshot.val()
}

// Render Comment
window.onload = function() {
    render()
}

async function render() {
    try {
        function getPostFromUrl(url) { return url.match(/[?](.*)/)[1]; }
        var Post = getPostFromUrl(window.location.href)
        try {
            var Post_Number = await get()
            var Post_Number = Post_Number[Post]
        } catch (error) {
            database.ref('comments/' + Post + "/" + 0).set({})
            var Post_Number = await get()
            var Post_Number = Post_Number[Post]
        }
        console.log(Post_Number)

        // Dynamic Comment Length
        if (Post_Number.length == 1) {
            document.querySelector("#Post_Number").innerHTML = (Post_Number.length + " Comment")
        } else {
            document.querySelector("#Post_Number").innerHTML = (Post_Number.length + " Comments")
        }

        // Comment Section
        for (let num = 0; num < (Post_Number.length); num++) {
            var Post = Post_Number[num]
            var name = Post["name"]
            var comment = Post["comment"]
            var time = Post["time"]
            var icon = Post["icon"]
            
            function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }
            var icon = ("https://drive.google.com/uc?id=" + getIdFromUrl(icon))

            // local
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const raw_date = time.split("/")
            var Day = raw_date[0]
            var Month = months[(raw_date[1]-1)]
            var Year = raw_date[2]

            var added_post = "<li><figure><img src=" + icon + " alt='' class='img-responsive'/></figure><section><h4>" + name + "</h4><div class='date-pan'>" + Month + " " + Day + ", " + Year + "</div>" + comment + "</section></li>"
            document.querySelector("#Comments").innerHTML += added_post
        }
    } catch (error) {
        document.querySelector("#Post_Number").innerHTML = ("0 Comments")
    }
}

// Write Comment

async function save() {
    var name = document.getElementById("form-name").value
    var comment = document.getElementById("form-comment").value
    var time = date
    var icon = icons[Randint(0, 9)]

    try {
        try {
            var Post_Number = await get()
            var Post_Number = Post_Number[Post]
        } catch (error) {
            database.ref('comments/' + Post + "/" + 0).set({})
            var Post_Number = await get()
            var Post_Number = Post_Number[Post]
        }
        console.log(Post_Number)
        console.log(Post_Number.length)
        var Post_Number = Post_Number.length
    
    
        database.ref('comments/' + Post + "/" + Post_Number).set({
            name: name,
            comment: comment,
            time: time,
            icon: icon
        })
        location.reload()
    } catch (error) {
        database.ref('comments/' + Post + "/" + 0).set({
            name: name,
            comment: comment,
            time: time,
            icon: icon
        })
        location.reload()
    }
}