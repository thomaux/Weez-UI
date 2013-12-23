ko.bindingHandlers.card = {
    init: function(element, valueAccessor){
        var card = valueAccessor();
        element.classList.add("rank-" + formatValue(card.value));
        element.classList.add(formatSuit(card.suit));

        var valueContainer = document.createElement("span");
        valueContainer.classList.add("rank");
        valueContainer.innerText = ("" + formatValue(card.value)).toUpperCase();

        var suitContainer = document.createElement("span");
        suitContainer.classList.add("suit");
        ko.applyBindingsToNode(suitContainer, {
            toSymbol: card.suit
        });

        element.appendChild(valueContainer);
        element.appendChild(suitContainer);
    }
};

ko.bindingHandlers.toSymbol = {
    init: function(element, valueAccessor){
        element.innerHTML = "&" + formatSuit(valueAccessor()) + ";";
    }
};

ko.bindingHandlers.isActivePlayer = {
    update: function(element, valueAccessor){

    }
};

function formatValue(value){
    switch (value) {
        case 11:
            value = "j";
            break;
        case 12:
            value = "q";
            break;
        case 13:
            value = "k";
            break;
        case 1:
            value = "a";
            break;
        default:
            break;
    }
    return value;
}

function formatSuit(suit){
    switch(suit){
        case 0:
            suit = "spades";
            break;
        case 1:
            suit = "clubs";
            break;
        case 2:
            suit = "diams";
            break;
        case 3:
            suit = "hearts";
            break;
        default:
            return "quest";
            break;
    }
    return suit;
}