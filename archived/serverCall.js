 Ocp-Apim-Subscription-Key: <d05d5e62debe44349a0355ca5e32c5d3>
 Content-Type: application/json
 Accept: application/json



 {
     "documents": [
         {
             "language": "en",
             "id": "1",
             "text": "First document"
         },
         ...
         {
             "language": "en",
             "id": "100",
             "text": "Final document"
         }
     ]
 }

$.ajax({
  type: "POST",
  url: https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment,

  data: data,
  success: success,
  dataType: dataType
});
POST https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases
POST https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/languages