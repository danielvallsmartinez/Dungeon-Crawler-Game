class Player {
    constructor (playerName, groupToken) {
        this.name = playerName;
        this.gToken = groupToken;
        this.deads = 0;
        this.kills = 0;
    }

    get name() {
        return this.playerName;
    }
    
    set name(playerName) {
        this.playerName = playerName;
    }

    get gToken() {
        return this.groupToken;
    }
    
    set gToken(groupToken) {
        this.groupToken = groupToken;
    }

    get pToken() {
        return this.playerToken;
    }
    
    set pToken(playerToken) {
        this.playerToken = playerToken;
    }

    get code() {
        return this.playerCode;
    }
    
    set code(playerCode) {
        this.playerCode = playerCode;
    }

    get x() {
        return this.xPos;
    }
    
    set x(xPos) {
        this.xPos = xPos;
    }

    get y() {
        return this.yPos;
    }
    
    set y(yPos) {
        this.yPos = yPos;
    }

    get d() {
        return this.direction;
    }
    
    set d(direction) {
        this.direction = direction;
    }

    get attack() {
        return this.attackPoints;
    }
    
    set attack(attackPoints) {
        this.attackPoints = attackPoints;
    }

    get defense() {
        return this.defensePoints;
    }
    
    set defense(defensePoints) {
        this.defensePoints = defensePoints;
    }

    get health() {
        return this.healthPoints;
    }
    
    set health(healthPoints) {
        this.healthPoints = healthPoints;
    }

    get deads() {
        return this.playerDeads;
    }

    set deads(playerDeads){
        this.playerDeads = playerDeads;
    }

    get kills() {
        return this.playerKills;
    }

    set kills(playerKills){
        this.playerKills = playerKills;
    }

    get image() {
        return this.playerImage;
    }
    
    set image(playerImage) {
        this.playerImage = playerImage;
    }

    get object() {
        return this.playerObject;
    }
    
    set object(playerObject) {
        this.playerObject = playerObject;
    }
}

class GameState {
    constructor () {
        this.canUseApi = true;
    }

    get canUseApi() {
        return this.canFetch;
    }
    
    set canUseApi(canFetch) {
        this.canFetch = canFetch;
    }

    async waitToUseApi() {
        this.canUseApi = false;
        var promise = await new Promise(resolve => setTimeout(resolve, 1000));

        return promise;
    } 
}

async function spawnPlayer(player, gameState) {
    var url = "http://battlearena.danielamo.info/api/spawn/" + player.gToken + "/" + player.name;
    var response = await fetch(url);
    gameState.waitToUseApi().then( () => {
        gameState.canUseApi = true;
    });

    return response;
}

async function respawnPlayer(player, gameState) {
    var url = "http://battlearena.danielamo.info/api/respawn/" + player.gToken + "/" + player.pToken;
    var response = await fetch(url);
    gameState.waitToUseApi().then( () => {
        gameState.canUseApi = true;
    });

    return response;
}

async function removePlayer(player, gameState) {
    var url = "http://battlearena.danielamo.info/api/remove/" + player.gToken + "/" + player.pToken + "/" + player.code;
    var response = await fetch(url);
    gameState.waitToUseApi().then( () => {
        gameState.canUseApi = true;
    });
    
    return response;
}

async function getPlayersObjectsInfo(player, gameState) {
    var url = "http://battlearena.danielamo.info/api/playersobjects/" + player.gToken + "/" + player.pToken;
    var response = await fetch(url);
    gameState.waitToUseApi().then( () => {
        gameState.canUseApi = true;
    });

    return response;
}

async function getMapInfo(player, gameState) {
    var url = "http://battlearena.danielamo.info/api/map/" + player.gToken + "/" + player.pToken;
    var response = await fetch(url);
    gameState.waitToUseApi().then( () => {
        gameState.canUseApi = true;
    });

    return response;
}

async function getPlayerInfo(player, gameState) {
    var url = "http://battlearena.danielamo.info/api/player/" + player.gToken + "/" + player.pToken;
    var response = await fetch(url);
    gameState.waitToUseApi().then( () => {
        gameState.canUseApi = true;
    });

    return response;
}

async function movePlayer(player, direction, gameState) {
    var url = "http://battlearena.danielamo.info/api/move/" + player.gToken + "/" + player.pToken + "/" + direction;
    var response = await fetch(url);
    gameState.waitToUseApi().then( () => {
        gameState.canUseApi = true;
    });

    return response;
}

async function attack(player, direction, gameState) {
    var url = "http://battlearena.danielamo.info/api/attack/" + player.gToken + "/" + player.pToken + "/" + direction;
    var response = await fetch(url);
    gameState.waitToUseApi().then( () => {
        gameState.canUseApi = true;
    });

    return response;
}

async function craft(player, direction, gameState) {
    var url = "http://battlearena.danielamo.info/api/craft/" + player.gToken + "/" + player.pToken;
    var response = await fetch(url);
    gameState.waitToUseApi().then( () => {
        gameState.canUseApi = true;
    });

    return response;
}

/*async function pickup(player, object, gameState) {
    var url = "http://battlearena.danielamo.info/api/pickup/" + player.gToken + "/" + player.pToken;
    var response = await fetch(url);
    gameState.waitToUseApi().then( () => {
        gameState.canUseApi = true;
    });

    return response;
}*/

document.addEventListener("DOMContentLoaded", function() {

    var groupToken = "b89f979e";
    var playerName = "Pepe";
    var player = new Player(playerName, groupToken);
    var gameState = new GameState();
    var mapInfo;
    var playersAndObjectsInfo;

   

    if (gameState.canUseApi) {
        gameState.canUseApi = false;
        spawnPlayer(player, gameState).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Couldn't spawn player! Error code: " + response.status);
            }
        })
        .then(data => {
            player.pToken = data.token;
            player.code = data.code;
            console.log(data);
        })
        .catch(error => console.error(error));
    }
    else {
        new Promise(async () => {
            gameState.canUseApi = false;
            spawnPlayer(player, gameState).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Couldn't spawn player! Error code: " + response.status);
                }
            })
            .then(data => {
            player.pToken = data.token;
            player.code = data.code;
            console.log(data);
            })
            .catch(error => console.error(error));
        });
    }

    if (gameState.canUseApi) {
        gameState.canUseApi = false;
        getPlayerInfo(player, gameState).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Couldn't get the player information! Error code: " + response.status);
            }
        })
        .then(data => {
            player.attack = data.attack;
            player.defense = data.defense;
            player.d = data.direction;
            player.image = data.image;
            player.health = data.vitalpoints;
            player.x = data.x;
            player.y = data.y;
            console.log(player);
        })
        .catch(error => console.error(error));
    } 
    else{
        new Promise(async () => {  //No hacen falta las funciones resolve y reject ya que no queremos hacer nada cuando se cumpla/falle la promesa
            while (gameState.canUseApi == false) {
                await new Promise(r => setTimeout(r, 1));
            }
            gameState.canUseApi = false;
            getPlayerInfo(player, gameState).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Couldn't get the player information! Error code: " + response.status);
                }
            })
            .then(data => {
                player.attack = data.attack;
                player.defense = data.defense;
                player.d = data.direction;
                player.image = data.image;
                player.health = data.vitalpoints;
                player.x = data.x;
                player.y = data.y;
                console.log(player);
            })
            .catch(error => console.error(error));
        });
    }
    
    if (gameState.canUseApi) {
        gameState.canUseApi = false;
        getMapInfo(player, gameState).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Couldn't get map information! Error code: " + response.status);
            }
        })
        .then(data => {
            mapInfo = data;
            console.log(mapInfo);
        })
        .catch(error => console.error(error));
    }
    else {
        new Promise(async () => {  //No hacen falta las funciones resolve y reject ya que no queremos hacer nada cuando se cumpla/falle la promesa
            while (gameState.canUseApi == false) {
                await new Promise(r => setTimeout(r, 1));
            }
            gameState.canUseApi = false;
            getMapInfo(player, gameState).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Couldn't get map information! Error code: " + response.status);
                }
            })
            .then(data => {
                mapInfo = data;
                console.log(mapInfo);
            })
            .catch(error => console.error(error));
        });
    }

    if (gameState.canUseApi) {
        gameState.canUseApi = false;
        getPlayersObjectsInfo(player, gameState).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Couldn't get information of players and objects! Error code: " + response.status);
            }
        })
        .then(data => {
            playersAndObjectsInfo = data;
            console.log(playersAndObjectsInfo);
        })
        .catch(error => console.error(error));
    }
    else {
        new Promise(async () => {  //No hacen falta las funciones resolve y reject ya que no queremos hacer nada cuando se cumpla/falle la promesa
            while (gameState.canUseApi == false) {
                await new Promise(r => setTimeout(r, 1));
            }
            gameState.canUseApi = false;
            getPlayersObjectsInfo(player, gameState).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Couldn't get information of players and objects! Error code: " + response.status);
                }
            })
            .then(data => {
                playersAndObjectsInfo = data;
                console.log(playersAndObjectsInfo);
            })
            .catch(error => console.error(error));
        });
    }

    if (gameState.canUseApi) {
        gameState.canUseApi = false;
        movePlayer(player, "N", gameState).then(response => {
            if (response.ok) {
                console.log("Player moved");
            } else {
                throw new Error("Couldn't move the player! Error code: " + response.status);
            }
        })
        .catch(error => console.error(error));
    }
    else {
        new Promise(async () => {  //No hacen falta las funciones resolve y reject ya que no queremos hacer nada cuando se cumpla/falle la promesa
            while (gameState.canUseApi == false) {
                await new Promise(r => setTimeout(r, 1));
            }
            gameState.canUseApi = false;
            movePlayer(player, "N", gameState).then(response => {
                if (response.ok) {
                    console.log("Player moved");
                } else {
                    throw new Error("Couldn't move the player! Error code: " + response.status);
                }
            })
            .catch(error => console.error(error));
        });
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 /*   setTimeout(function(){ 
        craft(player, gameState).then(response => {
            if (response.ok) {
                console.log("Object crafted");
                return response.json();
            } else {
                throw new Error("Couldn't craft the object! Error code: " + response.status);
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
    }, 2000); */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (gameState.canUseApi) {
        gameState.canUseApi = false;
        attack(player, "N", gameState).then(response => {
            if (response.ok) {
                console.log("Player attacked");
                return response.json();
            } else {
                throw new Error("Player couldn't attack! Error code: " + response.status);
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
    }
    else {
        new Promise(async () => {  //No hacen falta las funciones resolve y reject ya que no queremos hacer nada cuando se cumpla/falle la promesa
            while (gameState.canUseApi == false) {
                await new Promise(r => setTimeout(r, 1));
            }
            gameState.canUseApi = false;
            attack(player, "N", gameState).then(response => {
                if (response.ok) {
                    console.log("Player attacked");
                    return response.json();
                } else {
                    throw new Error("Player couldn't attack! Error code: " + response.status);
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));
        });
    }

    if (gameState.canUseApi) {
        gameState.canUseApi = false;
        respawnPlayer(player, gameState).then(response => {
            if (response.ok) {
                console.log("respawned");
            } else {
                throw new Error("Couldn't respawn player! Error code: " + response.status);
            }
        })
        .catch(error => console.error(error));
    }
    else {
        new Promise(async () => {  //No hacen falta las funciones resolve y reject ya que no queremos hacer nada cuando se cumpla/falle la promesa
            while (gameState.canUseApi == false) {
                await new Promise(r => setTimeout(r, 1));
            }
            gameState.canUseApi = false;
            respawnPlayer(player, gameState).then(response => {
                if (response.ok) {
                    console.log("respawned");
                } else {
                    throw new Error("Couldn't respawn player! Error code: " + response.status);
                }
            })
            .catch(error => console.error(error));
        });
    }

    if (gameState.canUseApi) {
        gameState.canUseApi = false;
        removePlayer(player, gameState).then(response => {
            if (response.ok) {
                console.log("removed");
            } else {
                throw new Error("Couldn't remove player! Error code: " + response.status);
            }
        })
        .catch(error => console.error(error));
    }
    else {
        new Promise(async () => {  //No hacen falta las funciones resolve y reject ya que no queremos hacer nada cuando se cumpla/falle la promesa
            while (gameState.canUseApi == false) {
                await new Promise(r => setTimeout(r, 1));
            }
            gameState.canUseApi = false;
            removePlayer(player, gameState).then(response => {
                if (response.ok) {
                    console.log("removed");
                } else {
                    throw new Error("Couldn't remove player! Error code: " + response.status);
                }
            })
            .catch(error => console.error(error));
        });
    }
});