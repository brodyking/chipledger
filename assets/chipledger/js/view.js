function errorShow(error) {
    rehydrate();
    document.getElementById("jserrors").style.display = "block";
    document.getElementById("jserrors").innerText = error;
}

function hydrate() {
    // Sets the information in the stats tab
    document.getElementById("totalPot").value = "$" + data["totalPot"];
    document.getElementById("totalCashouts").value = "$" + data["totalCashouts"];
    document.getElementById("totalBuyins").value = "$" + data["totalBuyins"];
    document.getElementById("totalPlayers").value = data["totalPlayers"];
    
    // History tab
    document.getElementById("history").innerText = data["history"];

    // Hide alerts
    document.getElementById("jserrors").style.display = "none";
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