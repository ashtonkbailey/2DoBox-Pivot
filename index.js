// Constructor function

function Card(id, title, body) {
    this.id = Date.now();
    this.title = $('#title-input').val();
    this.body = $('#body-input').val();
    this.quality = "swill";
}

var newCard = function(id , title , body , quality) {
    return '<div id="' + id + '"class="card-container"><h2 class="title-of-card">'  
            + title +  '</h2>'
            + '<button class="delete-button"></button>'
            +'<p class="body-of-card">'
            + body + '</p>'
            + '<button class="upvote"></button>' 
            + '<button class="downvote"></button>' 
            + '<p class="quality">' + 'quality:' + '<span class="qualityVariable">' + quality + '</span>' + '</p>'
            + '<hr>' 
            + '</div>';
};

function cardObject() {
    return {
        id: newCard.id,
        title: $('#title-input').val(),
        body: $('#body-input').val(),
        quality: newCard.quality
    };
}

$.each(localStorage, function(key) {
    var cardData = JSON.parse(this);
    // numCards++;
    $( ".bottom-box" ).prepend(newCard(cardData.id, cardData.title, cardData.body, cardData.quality));
});

var localStoreCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem(newCard.id, cardString);
}

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#body-input').val() === "") {
       return false;
    };  

    // numCards++;
    $( ".bottom-box" ).prepend(newCard(newCard.id, $('#title-input').val(), $('#body-input').val(), newCard.quality)); 
    localStoreCard();
    $('form')[0].reset();
});

$(".bottom-box").on('click', function(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;

    var qualities = ['good', 'bad', 'ugly'];
    var upvote = $(event.target.className === "upvote");
    var downvote = $(event.target.className === "downvote");
    

// function qualityChange() {
//       where we update html/storage

// function upvote() {
// var qualityIndex = qualities.indexOf(quality);
// if (qualityIndex < quality.length) {qualityIndex++
//     } return quality[qualityIndex];
//     }
// function downvote() {

// }

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityVariable;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId, newCardJSON);

   
    } else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
});
      










