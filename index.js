
// Area we need to rework

// var newCard = function(id , title , body , quality) {
//     return '<div id="' + id + '"class="card-container"><h2 class="title-of-card">'  
//             + title +  '</h2>'
//             + '<button class="delete-button"></button>'
//             +'<p class="body-of-card">'
//             + body + '</p>'
//             + '<button class="upvote"></button>' 
//             + '<button class="downvote"></button>' 
//             + '<p class="quality">' + 'quality:' + '<span class="qualityVariable">' + 'swill' + '</span>' + '</p>'
//             + '<hr>' 
//             + '</div>';
// };

// function cardObject() {
//     return {
//         id: Date.now(),
//         title: $('#title-input').val(),
//         body: $('#body-input').val(),
//         quality: 'swill',
//     };
// }

// ***** Event Listeners *******

$('.save-btn').on('click', saveBtnClick);

$(".bottom-box").on('click', function(event){
    // var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;
    parseTheCard();
    // if (event.target.className === "upvote" ) {
    //     raiseQuality();
    // } else if (event.target.className === "downvote") {
    //     lowerQuality();
    // };
    parsedCard.quality = qualityVariable;
    var newCardJSON = JSON.stringify(parsedCard);
    localStorage.setItem(cardHTMLId, newCardJSON);

    if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
});


// ******* Constructor Functions **********



// *****   Functions   *******

$.each(localStorage, function() {
    var cardData = JSON.parse();
    $( ".bottom-box" ).prepend(newCard(cardData.id, cardData.title, cardData.body, cardData.quality));
});

var localStoreCard = function() {
    var indexValue = cardObject().id;
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem(indexValue, cardString);
}

function disableSaveBtn() {
   if ($('#title-input').val() === "" && $('#body-input').val() === "") {
       return false;
    }; 
}

function displayCard() {
    $( ".bottom-box" ).prepend(newCard($('#title-input').val(), $('#body-input').val()); 
    // $( ".bottom-box" ).prepend(newCard(newCard.id, $('#title-input').val(), $('#body-input').val(), newCard.quality));
}
    
function saveBtnClick(event) {
    event.preventDefault();
    disableSaveBtn(event);
    localStoreCard();
    displayCard();
    $('form')[0].reset();
};

function raiseQuality() {
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;
    if (currentQuality === 'swill') {
        qualityVariable = 'plausible';
    } else if (currentQuality === 'plausible') {
        qualityVariable = 'genius';
    };
}

function lowerQuality() {
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;
    if (currentQuality === 'genius') {
        qualityVariable = 'plausible';
    } else if (currentQuality === 'plausible') {
        qualityVariable = 'swill';
    };
}

function parseTheCard() {
        var cardHTML = $(event.target).closest('.card-container');
        var cardHTMLId = cardHTML[0].id;
        var cardObjectInJSON = localStorage.getItem(cardHTMLId);
        var parsedCard = JSON.parse(cardObjectInJSON);  
        console.log('works');
    };
      










