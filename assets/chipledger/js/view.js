function errorShow(error) {
    rehydrate();
    document.getElementById("jserrors").style.display = "block";
    document.getElementById("jserrors").innerText = error;
}

function hydrate() {
    let players = data["players"];
    let history = data["history"];
    // Sets the page url
    window.history.replaceState({page: "current"}, "current page", "/view?game="+gameName);


    // Sets the information in the stats tab
    document.getElementById("totalPot").value = "$" + data["totalPot"];
    document.getElementById("totalCashouts").value = "$" + data["totalCashouts"];
    document.getElementById("totalBuyins").value = "$" + data["totalBuyins"];
    document.getElementById("totalPlayers").value = data["totalPlayers"];
    
    // History tab
     if (history.length > 0) {
        let historyList = "<table class='table table-striped border'>";
        let backgroundColor = "";
        history.forEach(element => {
            if (element["type"] == "buyin") {
                backgroundColor = "bg-success-subtle";
            } else if (element["type"] == "join"){
                backgroundColor = "bg-info-subtle";
            } else if (element["type"] == "cashout") {
                backgroundColor = "bg-warning-subtle";
            } else {

                backgroundColor = "";
            }
            historyList += "<tr><td class='"+backgroundColor+" border-right border-1'>"+element["type"]+"</td><td>"+element["message"] + "</td></tr>";
        });
        document.getElementById("history").innerHTML = historyList + "</table>";
    } else {
        document.getElementById("history").innerHTML = "No history.";
    }    
    
    
    // Players tab
     if (players.length > 0) {
        let playerList = "<table class='table table-striped border'><thead><td class='border-right border-1'><b>Name</b></td><td class='border-right border-1'><b>Buy in</b></td><td class='border-right border-1'><b>Cash out</b></td><td><b>Net Profit</b></td></thead>";
        players.forEach(element => {
            let profit = data["cashouts"][element] - data["buyins"][element];
            if (profit < 0) {
                profit = "-$"+Math.abs(profit);
            } else {
                profit = "$"+Math.abs(profit);
            }
            playerList += "<tr><td class='border-right border-1'>"+element+"</td><td class='border-right border-1'>$"+data["buyins"][element]+"</td><td class='border-right border-1'>$"+data["cashouts"][element]+"</td><td>"+profit+"</td></tr>";
        });
        document.getElementById("players").innerHTML = playerList + "</table>";
    } else {
        document.getElementById("players").innerHTML = "No participants.";
    }

    // Hide alerts
    document.getElementById("jserrors").style.display = "none";

    // Buyin Names Selection
     if (players.length > 0) {
        document.getElementById("buyinNamesList").disabled = false;
        let buyinNamesList = "<option value='disabled'>Please select a player</option>";
        players.forEach(element => {buyinNamesList += "<option value='"+element+"'>"+element+"</option>";});
        document.getElementById("buyinNamesList").innerHTML = buyinNamesList;
    } else {
        document.getElementById("buyinNamesList").innerHTML = "<option value='disabled'>No participants.</option>";
        document.getElementById("buyinNamesList").disabled = true;
    }

    // Cashout Names Selection
     if (players.length > 0) {
        document.getElementById("cashoutNamesList").disabled = false;
        let cashoutNamesList = "<option value='disabled'>Please select a player</option>";
        players.forEach(element => {cashoutNamesList += "<option value='"+element+"'>"+element+"</option>";});
        document.getElementById("cashoutNamesList").innerHTML = cashoutNamesList;
    } else {
        document.getElementById("cashoutNamesList").innerHTML = "<option value='disabled'>No participants.</option>";
        document.getElementById("cashoutNamesList").disabled = true;
    }


}

function rehydrate() {

    hydrate();

    if (document.getElementById("alerterror") !== null) {
        document.getElementById("alerterror").style.display = "none";
    }

    if (document.getElementById("alertsuccess") !== null) {
        document.getElementById("alertsuccess").style.display = "none";
    }

}

hydrate();

// Adding players
async function addPlayer() {
    try {
        let playerName = document.getElementById("newplayerName").value;
        document.getElementById("newplayerName").value = "";
        const response = await fetch("/api/v1/game/addPlayer?name="+gameName+"&playername="+playerName);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        if (json["error"] == true) {
            errorShow(json["errormessage"]);
        } else {
            data = json;
                rehydrate();

        }
    } catch (error) {
    console.error(error.message);
    }
}

// Adding buyins
async function addBuyin() {
    try {
        let playerName = document.getElementById("buyinNamesList").value;
        let amount = document.getElementById("buyinAmount").value;
        document.getElementById("buyinAmount").value = "1.00";
        const response = await fetch("/api/v1/game/addBuyin?name="+gameName+"&playername="+playerName+"&amount="+amount);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        if (json["error"] == true) {
            errorShow(json["errormessage"]);
        } else {
            data = json;
                rehydrate();

        }
    } catch (error) {
    console.error(error.message);
    }
}

// Adding cashouts
async function addCashout() {
    try {
        let playerName = document.getElementById("cashoutNamesList").value;
        let amount = document.getElementById("cashoutAmount").value;
        document.getElementById("cashoutAmount").value = "1.00";
        const response = await fetch("/api/v1/game/addCashout?name="+gameName+"&playername="+playerName+"&amount="+amount);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        if (json["error"] == true) {
            errorShow(json["errormessage"]);
        } else {
            data = json;
                rehydrate();

        }
    } catch (error) {
    console.error(error.message);
    }
}

document.querySelector('#addBuyinForm').addEventListener('submit', (event) => {
  event.preventDefault() 
  addBuyin();
})

document.querySelector('#addPlayerForm').addEventListener('submit', (event) => {
  event.preventDefault() 
  addPlayer();
})


document.querySelector('#addCashoutForm').addEventListener('submit', (event) => {
  event.preventDefault() 
  addCashout();
})