const BASE_URL = "http://numbersapi.com";
let form = $("#num-form");
let list = $("#num-list");

let form2 = $("#form2");


form.on("submit", getFacts);
form2.on("submit", getMultipleFacts);


function addFactsToPage(facts) {

    for (const num in facts) {
        let newFact = document.createElement("li");
        newFact.innerText = `${num}: ${facts[num]}`;
        list.append(newFact);
    }
}

async function getFacts(e) {
    e.preventDefault();

    let nums = $("#numbers").val();

    axios.get(`${BASE_URL}/${nums}`)
    .then(res => {
        addFactsToPage(res.data);
        console.log(res.data);
    }).catch(err => {
         console.log(err)});

}


async function getMultipleFacts(e) {
    e.preventDefault();

    let fourNumberPromises = [];    
    let number = $("#num-2").val();

    for (let i = 0; i < 4; i++) {
        fourNumberPromises.push(
            axios.get(`${BASE_URL}/${number}`)
        )
    }

    Promise.all(fourNumberPromises)
    .then(factsArray => {
        factsArray.forEach(f => {
            let li = document.createElement("li");
            li.textContent = f.data;
            $("#facts-list").append(li);
        })
    })
    .catch(err => console.log(err));

}




