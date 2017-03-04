function postrequest() {
    var _data = {
        "documents": [
            {
                "language": "en",
                "id": "1",
                "text": $("#text").val(),
            }
        ]
    }

    console.log(_data);

    $.ajax({
        type: "POST",
        url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyphrases",
        headers: {
            "Ocp-Apim-Subscription-Key": "d05d5e62debe44349a0355ca5e32c5d3", 
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        data: JSON.stringify(_data),
        success: function(data) {
            console.log(data);
        },
    });

    return false;
}