
// ***** Event Listeners *******

$(document).ready(regenerateCards);

$('.save-btn').on('click', saveBtnClick);

// (event.target.className === "delete-button")

$(".bottom-box").on('click', checkTargetOnPage) 



// $(".bottom-box").on('click', function(event){
    // var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    // var qualityVariable;
    // if (event.target.className === "upvote" ) {
    //     raiseQuality();
    //     console.log('up');
    // } else if (event.target.className === "downvote") {
    //     lowerQuality();
    //     console.log('down');
    // };
    // parsedCard.quality = qualityVariable;
    // var newCardJSON = JSON.stringify(parsedCard);
    // localStorage.setItem(cardHTMLId, newCardJSON);
    // *******changeQuality();
    // deleteCard();
    // })


// ******* Constructor Functions **********

function Card(id, title, body, quality) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.quality = quality || 'swill'
    }

// *****   Functions   *******

function getCards() {
    var cardsArray = JSON.parse(localStorage.getItem('cardsArray')) || [];
    return cardsArray;
}

function saveBtnClick(event) {
    event.preventDefault();
    // disableSaveBtn();
    var newCard = new Card(Date.now(), $('#title-input').val(), $('#body-input').val());
    var cardsArray = getCards();
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
    var cardsArray = getCards();
    cardsArray.forEach(function(element) {
    displayCard(element);
    });
}

// $.each(localStorage, function() {
//     var cardData = JSON.parse();
//     $( ".bottom-box" ).prepend(newCard(cardData.id, cardData.title, cardData.body, cardData.quality));
// });

function deleteCard() {
    // if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardsArray = getCards();
        var foundIndex = cardsArray.findIndex(selectCardIndex);
        cardsArray.splice(foundIndex, 1);
        localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
    }
// }

function selectCardIndex(element) {
    var cardHTMLId = event.target.parentNode.dataset.id;
    return element.id == cardHTMLId;
} 

function checkTargetOnPage() {
    if (event.target.className === "delete-button") {
        deleteCard();
    };
    if (event.target.className === "upvote") {
        raiseQuality();
    };
    if (event.target.className === "downvote") {
        lowerQuality();
    };
}

 //next we will need to change the inner text of quality to represent new value
// then we will need to update the storage / change the info in the array
// we want to stop functionality of going up so we don't go out of the array
// then do all the same stuff for the down button.

function raiseQuality() {
    var qualities = ['swill', 'plausible', 'genius'];
    var cardHTML = $(event.target).closest('.card-container');
    var cardsArray = getCards();
    var foundIndex = cardsArray.findIndex(selectCardIndex);
        console.log(cardsArray[foundIndex]);
        console.log(cardsArray[foundIndex].quality);

    var currentStoredQuality = cardsArray[foundIndex].quality;
        // console.log(currentStoredQuality);
    var qualityIndex = qualities.indexOf(currentStoredQuality);
        // console.log(qualityIndex);
    if (qualityIndex <= 1) {
        qualityIndex++;
        // console.log(qualityIndex);
        var bob = qualities[qualityIndex];
        // console.log(bob);
        cardsArray[foundIndex].quality = bob;
         // console.log(cardsArray[foundIndex].quality);

        //  ***add part update array-- likely a method****
        //  push up changes

        // cardsArray.******push*****(newCard);
        // localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
        //  regenerateCards();
    };
}









