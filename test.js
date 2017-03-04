    $(function() {
        var params = {
            // Request parameters
            "numberOfLanguagesToDetect": "{integer}",
        };
      
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/languages?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
            },
            type: "POST",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    });

function postrequest() {
    $.ajax({
        type: "POST",
        url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyphrases",
        headers: {"Ocp-Apim-Subscription-Key": "your_api_key", "Content-Type": "application/json", "Accept": "application/json"}
        data: data,
        success: success,
        dataType: dataType
    });
}