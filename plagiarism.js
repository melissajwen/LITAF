var cheerio = require("cheerio");
var proxyNeedle = require("proxyneedle");

function parseText (text, settings, cb){
    if (text.length > (settings.maxCharacterCount || 1000)){
        cb("Text is too long");
        return false;
    }
    var textArr = text.split("."), queries = [];

    for (var i = 0; i < textArr.length; i++){
        var wordArr = textArr[i].split(" ");
        var textToCheck = "";
        if (wordArr.length < (settings.numSentenceCharactersToCheck || 14)){
            textToCheck = wordArr.join(" ");
        }
        else {
            textToCheck = wordArr.slice(0, (settings.numSentenceCharactersToCheck - 1 || 13)).join(" ");
        }

        textToCheck = textToCheck.replace('"', "");
        if (!textToCheck.trim()){
            continue;
        }
        textToCheck = '+"' + textToCheck + '"';
        queries.push(textToCheck);
    }
    return queries;
}

function queryBing(data, queries, cb){
    var ind = data.ind;
    var duplicates = data.duplicates;
    var duplicateStrings = data.duplicateStrings;
    console.log(queries[ind]);
    proxyNeedle.action("http://www.bing.com/search?q=" + encodeURIComponent(queries[ind]),
        function(error, data){
            parseGooglePage(data);
        });
}

function parseGooglePage(body){
    $ = cheerio.load(body);
    var hasResults = $(".sb_count").length;
    if (hasResults){
        ++duplicates;
        duplicateStrings.push(queries[ind]);
    }
    ind++;
    console.log(ind);
    if (ind < queries.length){
        return queryBing({
            ind: ind,
            duplicates: duplicates,
            duplicateStrings:duplicateStrings
        }, queries, cb);
    }
    return cb (null, {
        duplicateStrings: duplicateStrings,
        percentagePlagiarized: Math.round((duplicates / queries.length)*100),
        totalItems: queries.length,
        duplicates: duplicates
    });
}

module.exports = function(text, settings, cb){

    var queries = parseText(text, settings, cb);

    if (!queries){
        return;
    }

    queryBing({

        ind: 0,
        duplicates, 0,
        duplicateStrings: []
    }, queries, cb);
}
