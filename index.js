
// ***** Event Listeners *******

$(document).ready(regenerateCards);

$('.save-btn').on('click', saveBtnClick);

$(".bottom-box").on('click', function(event){
    // var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    // var qualityVariable;
    // parseTheCard();
    // if (event.target.className === "upvote" ) {
    //     raiseQuality();
    // } else if (event.target.className === "downvote") {
    //     lowerQuality();
    // };
    // parsedCard.quality = qualityVariable;
    // var newCardJSON = JSON.stringify(parsedCard);
    // localStorage.setItem(cardHTMLId, newCardJSON);
    deleteCard();
    })

function deleteCard() {
    if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var foundIndex = cardsArray.findIndex(bob);
        console.log(foundIndex);
        cardsArray.splice(foundIndex, 1);
        console.log(cardsArray);
        localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
    }
}
function bob(element) {
    var cardHTMLId = event.target.parentNode.dataset.id;
    console.log(cardHTMLId);
    console.log(element);
    return element.id == cardHTMLId;
} 
// <<<<<< findIndex method doesn't find correct index

// *******   Global Variable  ******
var cardsArray = JSON.parse(localStorage.getItem('cardsArray')) || [];

// ******* Constructor Functions **********

function Card(id, title, body, quality) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.quality = quality || 'swill'
    }

// *****   Functions   *******

function saveBtnClick(event) {
    event.preventDefault();
    // disableSaveBtn();
    var newCard = new Card(Date.now(), $('#title-input').val(), $('#body-input').val());
    cardsArray.push(newCard);
    localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
    displayCard(newCard);
    $('form')[0].reset();
};

// function disableSaveBtn() {
//     console.log('savefunction');
//    if ($('#title-input').val() !== "" && $('#body-input').val() !== "") {
//         $('.save-btn').disabled = false;
//     } else {
//         $('.save-btn').prop('disabled', true);
//     }; 
// }

function displayCard(card) {
    var newDiv = document.createElement('div');
    newDiv.innerHTML = `<div data-id="${card.id}" class="card-container">
                            <h2 class="title-of-card">${card.title}</h2>
                            <button class="delete-button"></button>
                            <p class="body-of-card">${card.body}</p>
                            <button class="upvote"></button>
                            <button class="downvote"></button>
                            <p class="quality">Quality: 
                            <span class="qualityVariable">${card.quality}</span></p>
                            <hr>
                        </div>`
    $( ".bottom-box" ).prepend(newDiv);
}

function regenerateCards() {
    console.log('sdfgouhas');
    JSON.parse(localStorage.getItem('cardsArray'));
    console.log(cardsArray);
    cardsArray.forEach(function(element) {
    displayCard(element);
    });
}

// $.each(localStorage, function() {
//     var cardData = JSON.parse();
//     $( ".bottom-box" ).prepend(newCard(cardData.id, cardData.title, cardData.body, cardData.quality));
// });




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

// function parseTheCard() {
//         var cardHTML = $(event.target).closest('.card-container');
//         var cardHTMLId = cardHTML[0].id;
//         var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//         var parsedCard = JSON.parse(cardObjectInJSON);  
//         console.log('works');
//     };
      










