let cards = [];
// This code uses Async / Await 
async function practiceGettingCards() {

    try {
        let res = await axios.get("https://deckofcardsapi.com/api/deck/new/");

        let id = res.data['deck_id'];
        // console.log(res);
        let cardResult = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`);

        let card = cardResult.data["cards"][0];
        cards.push(`${card["value"]} of ${card["suit"]}`);

        let cardResult2 = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)

        let card2 = cardResult2.data["cards"][0];
        cards.push(`${card2["value"]} of ${card2["suit"]}`);
    
    } catch(err) {
        console.log(err);
    }

}

$(document).ready(function() {

    let card_div = $("#card-div");

    function getRotatation() {
        let multiplier = (-1) ** Math.round(Math.random() * 10);
        let r = Math.random() * 45 * multiplier;
        return Math.round(r);
    }

    async function getShuffledDeck() {
        try {
            let deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle");
            window.id = deck.data['deck_id'];
            return window.id;
        
        } catch(err) {
            console.log(err);
        }
    }

    getShuffledDeck();

    async function getCard() {
        try {
            let result = await axios.get(`https://deckofcardsapi.com/api/deck/${window.id}/draw/?count=1`)
            return result;

        } catch(err) {
            console.log(err);
        }
    }

    $("button").on("click", function() {
        let res = getCard();
        let card = document.createElement("img");
        card.src =  res.data["cards"][0]["image"];

        card.classList.add("card")
        card.style.transform = `rotate(${getRotatation()}deg)`;
        card_div.append(card);

        if (res.data["remaining"] == 0) {
            $("button").attr("disabled", true);
            let text = document.createElement("p");
            text.textContent = "No Cards Remaining!"
            $("#btn-div").append(text);
        }
    })
    

});
