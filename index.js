
// ***** Event Listeners *******

$(document).ready(regenerateCards);

$('.save-btn').on('click', saveBtnClick);

// (event.target.className === "delete-button")

$(".bottom-box").on('click', checkTargetOnPage) 


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

function raiseQuality() {
    var qualities = ['swill', 'plausible', 'genius'];
    var cardsArray = getCards();
    var foundIndex = cardsArray.findIndex(selectCardIndex);
    var currentStoredQuality = cardsArray[foundIndex].quality;
    var i = qualities.indexOf(currentStoredQuality);
    if (i <= 1) {
        i++;
        cardsArray[foundIndex].quality = qualities[i];
        localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
         $('.card-container').remove();
         regenerateCards();
    };
}

function lowerQuality() {
    var qualities = ['swill', 'plausible', 'genius'];
    var cardsArray = getCards();
    var foundIndex = cardsArray.findIndex(selectCardIndex);
    var currentStoredQuality = cardsArray[foundIndex].quality;
    var i = qualities.indexOf(currentStoredQuality);
    if (i >= 1) {
        i--;
        cardsArray[foundIndex].quality = qualities[i];
        localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
         $('.card-container').remove();
         regenerateCards();
    };
}







