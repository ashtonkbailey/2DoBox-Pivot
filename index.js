
// ***** Event Listeners *******

$(document).ready(regenerateCards);

$('.save-btn').on('click', saveBtnClick);

$(".bottom-box").on('click', checkTargetOnPage) 

$(document).keypress(updateCardEdits);

$('form').on('keyup', enableSaveBtn)

// $(document).on('keyup', filterCards($('.search-field').text()))**********

// ******* Constructor Functions **********

function Card(id, title, body, quality) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.quality = quality || 'none';
        this.completed = false;
}

// *****   Functions   *******

function completed() {
    $(event.target).closest('.card-container').toggleClass('completed-card');
    var cardsArray = getCards();
    var foundIndex = cardsArray.findIndex(selectCardIndex);
    var completedOnCard = cardsArray[foundIndex].completed;
    cardsArray[foundIndex].completed = true;
    localStorage.setItem('cardsArray', JSON.stringify(cardsArray));

}

//************************************************************
// function filterCards(string) {
//     console.log('hello');
//     var titleOnCard = $('.title-of-card').text();
//     var bodyOnCard = $('.body-of-card').text();
//     cardsArray = getCards();
//     var filteredArray = cardsArray.filter(function(card) {
//         var body = card.body.toLowerCase();
//         var title = card.title.toLowerCase();
//         if (body.includes(string) || title.includes(string)) {
//             return card;
//         };
//     });
//     filteredArray.forEach(function(element) {
//          displayCard(element);
//     });
// }********************************************************

function enableSaveBtn() {
   if ($('#title-input').val() !== "" && $('#body-input').val() !== "") {
        $('.save-btn').removeAttr('disabled');
    }; 
}

function disableSaveBtn() {
    $('.save-btn').attr('disabled', true);
}

function updateCardEdits(e) {
    if (e.which == 13) {
        var cardsArray = getCards();
        var foundIndex = cardsArray.findIndex(selectCardIndex);
        var currentStoredTitle = cardsArray[foundIndex].title;
        var titleOnCard = $('.title-of-card').text();
        cardsArray[foundIndex].title = titleOnCard;
        var currentStoredBody = cardsArray[foundIndex].body;
        var bodyOnCard = $('.body-of-card').text();
        cardsArray[foundIndex].body = bodyOnCard;
        localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
        $('.card-container').remove();
        regenerateCards();
    }; 
}

function getCards() {
    var cardsArray = JSON.parse(localStorage.getItem('cardsArray')) || [];
    return cardsArray;
}

function saveBtnClick(event) {
    event.preventDefault();
    var newCard = new Card(Date.now(), $('#title-input').val(), $('#body-input').val());
    var cardsArray = getCards();
    cardsArray.push(newCard);
    localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
    displayCard(newCard);
    $('form')[0].reset();
    disableSaveBtn();
}

function displayCard(card) {
    var newDiv = document.createElement('div');
    newDiv.innerHTML = `<div data-id="${card.id}" class="card-container">
                            <h2 class="title-of-card" contenteditable="true">${card.title}</h2>
                            <button class="delete-button"></button>
                            <p class="body-of-card" contenteditable="true">${card.body}</p>
                            <button class="upvote"></button>
                            <button class="downvote"></button>
                            <p class="quality">Level of Importance: 
                            <span class="qualityVariable">${card.quality}</span></p>
                            <button class="completed-btn">completed<button>
                            <hr>
                        </div>`
    $( ".bottom-box" ).prepend(newDiv);
}

function regenerateCards() {
    var cardsArray = getCards();
    cardsArray.forEach(function(element) {
         displayCard(element);
    });
};



function deleteCard() {
    var cardHTML = $(event.target).closest('.card-container').remove();
    var cardsArray = getCards();
    var foundIndex = cardsArray.findIndex(selectCardIndex);
    cardsArray.splice(foundIndex, 1);
    localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
}

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
    if (event.target.className === "completed-btn") {
        completed();
    }
}

function raiseQuality() {
    var qualities = ['none', 'low', 'normal', 'high', 'critical'];
    var cardsArray = getCards();
    var foundIndex = cardsArray.findIndex(selectCardIndex);
    var currentStoredQuality = cardsArray[foundIndex].quality;
    var i = qualities.indexOf(currentStoredQuality);
    if (i <= 4) {
        i++;
        cardsArray[foundIndex].quality = qualities[i];
        localStorage.setItem('cardsArray', JSON.stringify(cardsArray));
         $('.card-container').remove();
         regenerateCards();
    };
}

function lowerQuality() {
    var qualities = ['none', 'low', 'normal', 'high', 'critical'];
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








