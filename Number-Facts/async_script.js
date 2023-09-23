const BASE_URL = "http://numbersapi.com";
let form = $("#num-form");
let list = $("#num-list");

let form2 = $("#form2");

//The Code Below Uses Async/Await

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
    try {
        let res = await axios.get(`${BASE_URL}/${nums}`);
        addFactsToPage(res.data);

    } catch(err) {
        console.log(err);
    }

}

async function getMultipleFacts(e) {
    e.preventDefault();
  
    let number = $("#num-2").val();

    try {
        let f1 =  axios.get(`${BASE_URL}/${number}`);
        let f2 =  axios.get(`${BASE_URL}/${number}`);
        let f3 =  axios.get(`${BASE_URL}/${number}`);
        let f4 =  axios.get(`${BASE_URL}/${number}`);
    
        let fact1 = await f1;
        let fact2 = await f2;
        let fact3 = await f3;
        let fact4 = await f4;


        let factsArray = [fact1, fact2, fact3, fact4];

        factsArray.forEach(f => {
            let li = document.createElement("li");
            li.textContent = f.data;
            $("#facts-list").append(li);
        })

    } catch(err) {
        console.log(err);
    }


}
