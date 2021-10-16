var delayInMilliseconds = 250; //1 second

var rendered = "False"

try {
    setTimeout(function() {
        while (rendered != "True") {
            fetch("https://spreadsheets.google.com/feeds/cells/1bSuGlrnHjj9kh23c0_-YZN8T0UDPMlhBbAF8KcQK6MI/1/public/full?alt=json")
            .then(response => response.json())
                .then(data => {
                    setTimeout(function() {

                    }, delayInMilliseconds);     
            })
        var rendered = "True"
        }
    }, delayInMilliseconds);
} catch (error) {
    location.reload()
}