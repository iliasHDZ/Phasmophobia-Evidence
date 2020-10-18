const evids = {
    0: "Ghost Orb",
    1: "Spirit Box",
    2: "Fingerprints",
    3: "EMF Level 5",
    4: "Freezing Tempratures",
    5: "Ghost Writing"
}

const ghosts = {
    "Banshee": [3, 2, 4],
    "Demon": [1, 5, 4],
    "Jinn": [1, 0, 3],
    "Mare": [1, 0, 4],
    "Oni": [3, 1, 5],
    "Phantom": [3, 0, 4],
    "Poltergeist": [1, 2, 0],
    "Renevant": [3, 2, 5],
    "Shade": [3, 0, 5],
    "Wraith": [2, 1, 4],
    "Yurei": [5, 0, 4]
}

var pghosts = [];

var choice = -1;

var evis = {1: -1, 2: -1, 3: -1}

function update() {
    var tghosts = {};
    for (var gname in ghosts) {
        tghosts[gname] = ghosts[gname];
    }
    for (var i = 1; i < 4; i++) {
        var evi = evis[i];
        if (evi != -1) {
            for (var gname in tghosts) {
                if (tghosts.hasOwnProperty(gname)) {
                    var ghost = tghosts[gname];
                    var pass = false;
                    for (var e = 0; e < 3; e++) {
                        if (evi == ghost[e]) {
                            pass = true;
                        }
                    }
                    if (!pass)
                        delete tghosts[gname];
                }
            }
        }
    }
    pghosts = [];
    for (var gname in tghosts) {
        if (tghosts.hasOwnProperty(gname)) {
            pghosts.push(gname);
        }
    }
    if (choice >= pghosts.length)
        choice = -1;
    document.getElementById("evg").innerHTML = choice === -1 ? "Not yet Discovered" : pghosts[choice];
    for (var i = 1; i < 4; i++) {
        var text = evis[i] === -1 ? "No Evidence Found" : evids[evis[i]];
        document.getElementById("ev" + i).innerHTML = text;
    }
}

console.log("terst")

function loadArrows(i) {
    document.getElementById("la" + i).onclick = function() {
        evis[i]--;
        if (evis[i] < -1)
            evis[i] = 5;
        console.log(i + ":" + evis[i])
        update();
    }
    document.getElementById("ra" + i).onclick = function() {
        evis[i]++;
        if (evis[i] > 5)
            evis[i] = -1;
        console.log(i + ":" + evis[i])
        update();
    }
}

window.onload = function() {
    update();
    for(var i = 1; i < 4; i++) {
        console.log("la" + i)
        loadArrows(i);
    }
    document.getElementById("lag").onclick = function() {
        choice--;
        if (choice < -1)
            choice = pghosts.length-1;
        console.log("g:" + choice)
        update();
    }
    document.getElementById("rag").onclick = function() {
        choice++;
        if (choice >= pghosts.length)
            choice = -1;
        console.log("g:" + choice)
        update();
    }
}