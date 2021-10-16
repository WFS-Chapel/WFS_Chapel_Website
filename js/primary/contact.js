var delayInMilliseconds = 250; //1 second

try {
    setTimeout(function() {
        fetch("https://spreadsheets.google.com/feeds/cells/1bSuGlrnHjj9kh23c0_-YZN8T0UDPMlhBbAF8KcQK6MI/1/public/full?alt=json")
        .then(response => response.json())
            .then(data => {
                setTimeout(function() {

                }, delayInMilliseconds);     
        }).catch(function(error) {
            console.log(error);
        });
    }, delayInMilliseconds);
} catch (error) {
    location.reload()
}