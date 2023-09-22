let cards = [];

axios.get("https://deckofcardsapi.com/api/deck/new/")
.then(res => {
    let id = res.data['deck_id'];
   // console.log(res);
    return axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`);
})
.then(res => {
    let card1 = res.data["cards"][0];
    let id = res.data['deck_id'];
    cards.push(`${card1["value"]} of ${card1["suit"]}`);
    return axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
})
.then(res => {
    let card2 = res.data["cards"][0];
    cards.push(`${card2["value"]} of ${card2["suit"]}`);
})
.then(() => {
    for (let card of cards) {
       // console.log(card);
    }
})
.catch(err => console.error(err));



$(document).ready(function() {

    let card_div = $("#card-div");
    function getRotatation() {
        let multiplier = (-1) ** Math.round(Math.random() * 10);
        let r = Math.random() * 45 * multiplier;
        return Math.round(r);
    }

    axios.get("https://deckofcardsapi.com/api/deck/new/shuffle")
    .then(res => {
        window.id = res.data['deck_id'];
       // return axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`);
       console.log("Deck is shuffled");
       return window.id;
    })

    $("button").on("click", function() {
        axios.get(`https://deckofcardsapi.com/api/deck/${window.id}/draw/?count=1`)
        .then(res => {
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
    })


});
