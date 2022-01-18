
//Clase que contiene toda la información necesaria del jugador: la que nos da la API, la que crea el propio usuario 
//y alguna información extra necesaria para la lógica del programa, como si el jugador existe o no
class Player {
    constructor (groupToken) {
        this.gToken = groupToken;
        this.exists = true;
        this.kills = 0;
    }

    get exists() {
        return this.playerExists;
    }
    
    set exists(playerExists) {
        this.playerExists = playerExists;
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

    //La originalHealth nos sirve para calcular y mostar el porcentaje de la vida restante del jugador
    get originalHealth() {
        return this.originalHealthPoints;
    }
    
    set originalHealth(originalHealthPoints) {  
        this.originalHealthPoints = originalHealthPoints;
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

//Función que indica a la API que queremos spawnear un nuevo jugador 
async function spawnPlayer(player) {
    var url = "http://battlearena.danielamo.info/api/spawn/" + player.gToken + "/" + player.name;
    var response = await fetch(url);

    return response;
}

//Función que indica a la API que queremos revivir a nuestro jugador cuando este ha muerto
async function respawnPlayer(player) {
    var url = "http://battlearena.danielamo.info/api/respawn/" + player.gToken + "/" + player.pToken;
    var response = await fetch(url);

    return response;
}

//Función que indica a la API que queremos eliminar nuestro jugador actual
async function removePlayer(player) {
    var url = "http://battlearena.danielamo.info/api/remove/" + player.gToken + "/" + player.pToken + "/" + player.code;
    var response = await fetch(url);
    
    return response;
}

//Función que indica a la API que queremos obtener información sobre los jugadores y objetos de las casillas colindantes a las de nuestro jugador
async function getPlayersObjectsInfo(player) {
    var url = "http://battlearena.danielamo.info/api/playersobjects/" + player.gToken + "/" + player.pToken;
    var response = await fetch(url);

    return response;
}

//Función que indica a la API que queremos obtener información del mapa, en concreto de los enemigos y objetos que hay en este
async function getMapInfo(player) {
    var url = "http://battlearena.danielamo.info/api/map/" + player.gToken + "/" + player.pToken;
    var response = await fetch(url);

    return response;
}

//Función que indica a la API que queremos obtener información sobre nuestro jugador
async function getPlayerInfo(player) {
    var url = "http://battlearena.danielamo.info/api/player/" + player.gToken + "/" + player.pToken;
    var response = await fetch(url);

    return response;
}

//Función que indica a la API que queremos mover a nuestro jugador en una dirección en concreto, la cual proporcionamos en la llamada
async function movePlayer(player, direction) {
    var url = "http://battlearena.danielamo.info/api/move/" + player.gToken + "/" + player.pToken + "/" + direction;
    var response = await fetch(url);

    return response;
}

//Función que indica a la API que queremos atacar a uno de los jugadores de la casilla de en frente
async function attack(player, direction) {
    var url = "http://battlearena.danielamo.info/api/attack/" + player.gToken + "/" + player.pToken + "/" + direction;
    var response = await fetch(url);

    return response;
}

//Función que contiene la lógica para determinar en qué dirección queremos mover al jugador, o si queremos atacar.
//Se activa cuando se pulsa una tecla de movimiento o el espacio (la tecla de ataque).
function move(player) {
    
    var movementDirection = null;
    var direction = null;

    switch (event.keyCode) {
        case 32:  //space key, to attack
            if (player.health > 0) {  //Solamente podemos atacar si nuestro jugador está vivo
                attack(player, player.d).then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Player couldn't attack! Error code: " + response.status);
                    }
                })
                .catch(error => console.error(error));
            }
            break;
        case 65:  //a key
            switch (player.d) {
                case "N":  
                    direction = "O";
                    break;
                case "E":  
                    direction = "N";
                    break;
                case "S":  
                    direction = "E";
                    break;
                case "O":  
                    direction = "S";
                    break;
            }
            break;
        case 68:  //d key
            switch (player.d) {
                case "N":  
                direction = "E";
                    break;
                case "E":  
                direction = "S";
                    break;
                case "S":  
                direction = "O";
                    break;
                case "O":  
                direction = "N";
                    break;
            }
            break;
        case 87:  //w key
            switch (player.d) {
                case "N":  
                    movementDirection = "N";
                    break;
                case "E":  
                    movementDirection = "E";
                    break;
                case "S":  
                    movementDirection = "S";
                    break;
                case "O":  
                    movementDirection = "O";
                    break;
            }
            break;
        case 83:  //s key
            switch (player.d) {
                case "N":  
                    direction = "S";
                    break;
                case "E":  
                    direction = "O";
                    break;
                case "S":  
                    direction = "N";
                    break;
                case "O":  
                    direction = "E";
                    break;
            }
            break;
    } 

    //Si hemos pulsado una de las teclas que permiten girar la cámara, entonces actualizamos la brújula y la imagen del visor
    if (direction != null) { 

        player.d = direction;
        
        var game = document.getElementById("game");
        var visor = document.getElementById("visor");

        if (visor != null) {

            visor = getPlayerView(player);  //Asignamos un visor de la partida con la imagen que toca según la posición del jugador en el mapa
            document.getElementById("visor").style.backgroundImage = visor.style.backgroundImage;

            switch (player.d) {
                case "N":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(0deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
                case "E":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(90deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
                case "S":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(180deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
                case "O":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(270deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
            }

            actualizeCompass(player);
        }
        else {

            visor = getPlayerView(player);  //Asignamos un visor de la partida con la imagen que toca según la posición del jugador en el mapa
            game.appendChild(visor);

            switch (player.d) {
                case "N":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(0deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
                case "E":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(90deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
                case "S":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(180deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
                case "O":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(270deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
            }

            actualizeCompass(player);
        }
    }
    
    //En caso de haber pulsado W (tecla de avance) llamamos a la función movePlayer
    if (movementDirection != null) {

        movePlayer(player, movementDirection).then(response => {
            if (response.ok) {
            } else {
                throw new Error("Couldn't move the player! Error code: " + response.status);
            }
        })
        .then( () => {
            getPlayerInfo(player).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Couldn't get the player information! Error code: " + response.status);
                }
            })
            .then(data => {
                player.d = data.direction;
                player.x = data.x;
                player.y = data.y;
                player.health = data.vitalpoints;

                document.getElementById("health").textContent = ((player.health / player.originalHealth) * 100).toFixed(1) + "%";

                var game = document.getElementById("game");
                var visor = document.getElementById("visor");

                if (visor != null) {

                    visor = getPlayerView(player);  //Asignamos un visor de la partida con la imagen que toca según la posición del jugador en el mapa
                    document.getElementById("visor").style.backgroundImage = visor.style.backgroundImage;
                }
                else {

                    visor = getPlayerView(player);  //Asignamos un visor de la partida con la imagen que toca según la posición del jugador en el mapa
                    game.appendChild(visor);
                }
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    }
}

//Función que contiene la lógica para iniciar una nueva partida con un nuevo jugador
function startGame(player, playersAndObjectsInfo, mapInfo){

    player.name = document.getElementById("introduce_name_txt").value;

    spawnPlayer(player).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Couldn't spawn player! Error code: " + response.status);
        }
    })
    .then(data => {
        player.pToken = data.token;
        player.code = data.code;
        player.exists = true;
        actualizeInfo(player, playersAndObjectsInfo, mapInfo);

        getPlayerInfo(player).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Couldn't get the player information! Error code: " + response.status);
            }
        })
        .then(data => {  //Inicializamos los atributos del jugador con los valores devueltos por la API
            player.attack = data.attack;
            player.defense = data.defense;
            player.d = data.direction;
            player.image = data.image;
            player.health = data.vitalpoints;
            player.originalHealth = data.vitalpoints;
            player.x = data.x;
            player.y = data.y;

            player_name = document.getElementById("name");
            player_name.style.visibility = 'visible';
            document.getElementById("name").innerHTML = player.name;
            avatar = document.getElementById("avatar");
            avatar.style.backgroundImage = "url('./battlearena-avatars/my_character-"+player.image+".png')";
            avatar.style.visibility = 'visible';
            document.getElementById("player_name").style.visibility = 'visible';
            document.getElementById("player_health").style.visibility = 'visible';
            document.getElementById("health").style.visibility = 'visible';
            document.getElementById("attack").style.visibility = 'visible';
            document.getElementById("player_attack").style.visibility = 'visible';
            document.getElementById("player_defense").style.visibility = 'visible';
            document.getElementById("defense").style.visibility = 'visible';
            document.getElementById("health").textContent = ((player.health / player.originalHealth) * 100).toFixed(1) + "%";
            document.getElementById("attack").textContent = player.attack;
            document.getElementById("defense").textContent = player.defense;
            document.getElementById("view").style.visibility = "visible";

            if (document.getElementById("dead") != null) {
                document.getElementById("dead").style.visibility = "hidden";
            }

            var createPlayer = document.getElementById("game_createPlayer");

            var game = document.getElementById("game");
            game.removeChild(createPlayer);

            var visor = document.getElementById("visor");
            
            if (visor != null) {

                visor = getPlayerView(player);  //Asignamos un visor de la partida con la imagen que toca según la posición del jugador en el mapa
                document.getElementById("visor").style.backgroundImage = visor.style.backgroundImage;
            }
            else {

                visor = getPlayerView(player);  //Asignamos un visor de la partida con la imagen que toca según la posición del jugador en el mapa
                game.appendChild(visor);
            }

            var message = document.createElement("DIV");
            message.className = "message";
            message.setAttribute("id", "message");
            var message_txt = document.createTextNode("There are more enemies behind...");
            message_txt.className = "message_txt";
            message.appendChild(message_txt);
            visor.appendChild(message);

            var dead = document.createElement("DIV");
            dead.className = "dead";
            dead.setAttribute("id", "dead");
            var dead_txt = document.createTextNode("You are DEAD");
            dead_txt.className = "dead_txt";
            dead.appendChild(dead_txt);
            visor.appendChild(dead);

            var enemy1 = document.createElement("DIV");
            enemy1.className = "enemy1";
            enemy1.setAttribute("id", "enemy1");
            visor.appendChild(enemy1);

            var enemy1health = document.createElement("p");
            enemy1health.className = "enemyHealth";
            enemy1health.setAttribute("id", "enemy1health");
            enemy1health.textContent = "TONTO";
            enemy1.appendChild(enemy1health);

            var enemy2 = document.createElement("DIV");
            enemy2.className = "enemy2";
            enemy2.setAttribute("id", "enemy2");
            visor.appendChild(enemy2);

            var enemy2health = document.createElement("p");
            enemy2health.className = "enemyHealth";
            enemy2health.setAttribute("id", "enemy2health");
            enemy2.appendChild(enemy2health);

            var enemy3 = document.createElement("DIV");
            enemy3.className = "enemy3";
            enemy3.setAttribute("id", "enemy3");
            visor.appendChild(enemy3);

            var enemy3health = document.createElement("p");
            enemy3health.className = "enemyHealth";
            enemy3health.setAttribute("id", "enemy3health");
            enemy3.appendChild(enemy3health);

            //Dependiendo de la dirección del jugador, lo pintamos de una manera u otra en el minimapa
            switch (player.d) {
                case "N":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(0deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
                case "E":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(90deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
                case "S":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(180deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
                case "O":  
                    document.getElementsByClassName("minimapSquare")[60].style.background = "linear-gradient(270deg, rgba(8,141,14,1) 67%, rgba(8,141,14,1) 67%, rgba(0,255,7,1) 100%)";
                    break;
            }

            actualizeCompass(player);
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}

//Función que se activa al clicar el botón de NewPlayer, 
//la cual nos permite poner un nombre a nuestro jugador e clicar el botón de iniciar partida
function newPlayer(player, playersAndObjectsInfo, mapInfo) {

    if (document.getElementById("game_createPlayer_message") != null) {
        var createPlayer_message = document.getElementById("game_createPlayer_message");
    
        var game = document.getElementById("game");
        game.removeChild(createPlayer_message); 
        var game_createPlayer = document.createElement("DIV");
        game_createPlayer.className = "game_createPlayer";
        game_createPlayer.setAttribute("id", "game_createPlayer");

        var create_player = document.createElement("DIV");
        create_player.className = "create_player";
        create_player.setAttribute("id", "create_player");
        var create_player_txt = document.createTextNode("CREATE YOUR PLAYER");
        create_player_txt.className = "create_player_txt";
        create_player.appendChild(create_player_txt);
        game_createPlayer.appendChild(create_player);

        var name_label = document.createElement("DIV");
        name_label.className = "name_label";
        
        var name_label_txt = document.createTextNode("Player Name: ");
        name_label_txt.className = "name_label_txt";
        name_label.appendChild(name_label_txt);
        game_createPlayer.appendChild(name_label);

        var introduce_name = document.createElement("DIV");
        introduce_name.className = "introduce_name";
        introduce_name.setAttribute("id", "introduce_name");
        var introduce_name_txt = document.createElement("INPUT");
        introduce_name_txt.setAttribute("type", "text");
        introduce_name_txt.setAttribute("id", "introduce_name_txt");
        introduce_name_txt.className = "introduce_name_txt";
        introduce_name.appendChild(introduce_name_txt);
        game_createPlayer.appendChild(introduce_name);

        var start = document.createElement("BUTTON");
        start.innerHTML = "Start Game";
        start.onmousedown = function() { startGame(player, playersAndObjectsInfo, mapInfo)}; 
        start.className = "start";
        game_createPlayer.appendChild(start);

        game.appendChild(game_createPlayer);
    }   
}

//Función que se activa al clicar el botón de Delete Player y nos permite eliminar nuestro jugador en cualquier momento de la partida,
//independientemente de la situación en la que se encuentre. Nos retorna a la pantalla inicial.
function deletePlayer(player) {

    if (document.getElementById("visor") != null) {
        var game = document.getElementById("game");
        game.removeChild(document.getElementById("visor"));

        removePlayer(player).then(response => {
            if (response.ok) {
                player.exists = false;
            } else {
                throw new Error("Couldn't remove player! Error code: " + response.status);
            }
        })
        .catch(error => console.error(error));
    
        createPlayerMessage(game);
        document.getElementById("avatar").style.visibility = 'hidden';
        document.getElementById("name").style.visibility = 'hidden';
        document.getElementById("player_name").style.visibility = 'hidden';
        document.getElementById("player_health").style.visibility = 'hidden';
        document.getElementById("health").style.visibility = 'hidden';
        document.getElementById("attack").style.visibility = 'hidden';
        document.getElementById("player_attack").style.visibility = 'hidden';
        document.getElementById("player_defense").style.visibility = 'hidden';
        document.getElementById("defense").style.visibility = 'hidden';

        if (document.getElementById("dead") != null) {
            document.getElementById("dead").style.visibility = "hidden";
        }

        if (document.getElementById("top") != null && document.getElementById("bottom") != null && document.getElementById("left") != null && document.getElementById("right") != null) {

            document.getElementById("top").style.color = "white";
            document.getElementById("bottom").style.color = "white";
            document.getElementById("left").style.color = "white";
            document.getElementById("right").style.color = "white";
        }

        //Reseteamos el minimapa
        if (document.getElementById("view") != null) {

            for (var i = 0; i < 11; i++) {
    
                for (var u = 0; u < 11; u++) {
    
                    document.getElementsByClassName("minimapSquare")[i * 11 + u].style.background = "white";
                } 
            } 
        }
    }
}

//Función que crea y muestra la pantalla inicial
function createPlayerMessage(game) {
    var game_createPlayer_message = document.createElement("DIV");
    game_createPlayer_message.className = "game_createPlayer_message";
    game_createPlayer_message.setAttribute("id", "game_createPlayer_message");
    var game_createPlayer_txt = document.createTextNode("Create a new player to start");
    game_createPlayer_message.appendChild(game_createPlayer_txt);
    game.appendChild(game_createPlayer_message);
}

//Función que contiene la lógica necesaria para revivir a nuestro jugador. Se activa al clicar el botón de respawn
//y contiene la llamada a la función respawnPlayer
function respawnFromDeath(player) {

    if (document.getElementById("visor") != null) {

        if (player.health > 0) {  
            console.log("You cannot respawn if you are still alive");
        }
        else {
            respawnPlayer(player).then(response => {
                if (response.ok) {
                    getPlayerInfo(player).then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("Couldn't get the player information! Error code: " + response.status);
                        }
                    })
                    .then(data => {  //Seteamos los atributos del jugador revivido
                        player.image = data.image;
                        player.health = data.vitalpoints;
                        player.originalHealth = data.vitalpoints;
                        player.x = data.x;
                        player.y = data.y;
                        player.d = data.direction;
                
                        player_name = document.getElementById("name");
                        player_name.style.visibility = 'visible';
                        document.getElementById("name").innerHTML = player.name;
                        avatar = document.getElementById("avatar");
                        avatar.style.backgroundImage = "url('./battlearena-avatars/my_character-"+player.image+".png')";
                        avatar.style.visibility = 'visible';
                        document.getElementById("player_name").style.visibility = 'visible';
                        document.getElementById("player_health").style.visibility = 'visible';
                        document.getElementById("health").style.visibility = 'visible';
                        document.getElementById("attack").style.visibility = 'visible';
                        document.getElementById("player_attack").style.visibility = 'visible';
                        document.getElementById("player_defense").style.visibility = 'visible';
                        document.getElementById("defense").style.visibility = 'visible';

                        if (document.getElementById("dead") != null) {
                            document.getElementById("dead").style.visibility = "hidden";
                        }

                        document.getElementById("health").textContent = ((player.health / player.originalHealth) * 100).toFixed(1) + "%";
                        document.getElementById("attack").textContent = player.attack;
                        document.getElementById("defense").textContent = player.defense;
            
                        document.getElementById("visor").style.backgroundImage = getPlayerView(player).style.backgroundImage;

                        actualizeCompass(player);
                    })
                    .catch(error => console.error(error));
                } else {
                    throw new Error("Couldn't respawn player! Error code: " + response.status);
                }
            })
            .catch(error => console.error(error));
        }
    }
}

//Función contenedora de la lógica necesaria para mostrar los jugadores que se encuentran en la casilla de enfrente
//y no nos están dando la espalda
function showEnemiesInFront(player, playersAndObjectsInfo) {

    var xToCheck, yToCheck; 
    var assigned1 = false, assigned2 = false, assigned3 = false;

    switch (player.d) {
        case "N":
            xToCheck = player.x;
            yToCheck = player.y + 1;
            break;
        case "S":
            xToCheck = player.x;
            yToCheck = player.y - 1;
            break;
        case "E":
            xToCheck = player.x + 1;
            yToCheck = player.y;
            break;
        case "O":
            xToCheck = player.x - 1;
            yToCheck = player.y;
            break;
    }
        
    for (var i = 0; i < playersAndObjectsInfo.enemies.length; i++) {

        if (playersAndObjectsInfo.enemies[i].x == xToCheck && playersAndObjectsInfo.enemies[i].y == yToCheck) {
            
            if (!assigned1) {
                
                if (document.getElementById("enemy1") != null) {
                    document.getElementById("enemy1").style.backgroundImage = "url('./battlearena-avatars/my_character-" + playersAndObjectsInfo.enemies[i].image + ".png')";
                    document.getElementById("enemy1health").textContent = playersAndObjectsInfo.enemies[i].vitalpoints;
                    if (parseInt(document.getElementById("enemy1health").textContent) <= 0) {
                        document.getElementById("enemy1").style.opacity = "0.5";  //En caso de que el enemigo esté muerto, bajamos la opacidad de la imagen
                    }
                    else {
                        document.getElementById("enemy1").style.opacity = "1";
                    }
                    document.getElementById("enemy1").style.visibility = "visible";
                }
                
                if (document.getElementById("enemy2") != null) {
                    document.getElementById("enemy2").style.visibility = "hidden";
                }

                if (document.getElementById("enemy3") != null) {
                    document.getElementById("enemy3").style.visibility = "hidden";
                }

                if (document.getElementById("message") != null) {
                    document.getElementById("message").style.visibility = "hidden";
                }

                assigned1 = true;
            }
            else {

                if (!assigned2) {

                    if (document.getElementById("enemy2") != null) {
                        document.getElementById("enemy2").style.backgroundImage = "url('./battlearena-avatars/my_character-" + playersAndObjectsInfo.enemies[i].image + ".png')";
                        document.getElementById("enemy2health").textContent = playersAndObjectsInfo.enemies[i].vitalpoints;
                        if (parseInt(document.getElementById("enemy2health").textContent) <= 0) {
                            document.getElementById("enemy2").style.opacity = "0.5";  //En caso de que el enemigo esté muerto, bajamos la opacidad de la imagen
                        }
                        else {
                            document.getElementById("enemy2").style.opacity = "1";
                        }
                        document.getElementById("enemy2").style.visibility = "visible";
                    }

                    if (document.getElementById("enemy3") != null) {
                        document.getElementById("enemy3").style.visibility = "hidden";
                    }

                    if (document.getElementById("message") != null) {
                        document.getElementById("message").style.visibility = "hidden";
                    }
                    assigned2 = true;
                }
                else {
                    
                    if (!assigned3) {

                        if (document.getElementById("enemy3") != null) {
                            document.getElementById("enemy3").style.backgroundImage = "url('./battlearena-avatars/my_character-" + playersAndObjectsInfo.enemies[i].image + ".png')";
                            document.getElementById("enemy3health").textContent = playersAndObjectsInfo.enemies[i].vitalpoints;
                            if (parseInt(document.getElementById("enemy3health").textContent) <= 0) {
                                document.getElementById("enemy3").style.opacity = "0.5";  //En caso de que el enemigo esté muerto, bajamos la opacidad de la imagen
                            }
                            else {
                                document.getElementById("enemy3").style.opacity = "1";
                            }
                            document.getElementById("enemy3").style.visibility = "visible";
                        }

                        if (document.getElementById("message") != null) {
                            document.getElementById("message").style.visibility = "hidden";
                        }
                        assigned3 = true;
                    }
                    else {

                        if (document.getElementById("message") != null) {
                            document.getElementById("message").style.visibility = "visible";
                        }
                    }
                }
            }
        }
    }

    if (!assigned1 && !assigned2 && !assigned3) {
        
        if (document.getElementById("enemy1") != null) {
            document.getElementById("enemy1").style.visibility = "hidden";
        }

        if (document.getElementById("enemy2") != null) {
            document.getElementById("enemy2").style.visibility = "hidden";
        }

        if (document.getElementById("enemy3") != null) {
            document.getElementById("enemy3").style.visibility = "hidden";
        }
    }
}

//Función que se llama una vez iniciada la partida permite ir actualizando toda la información que puede cambiar sin que nosotros lo indiquemos.
//Llama a las funciones getPlayerInfo, getMapInfo y getPlayersObjectsInfo, que a su vez llaman a la API para obtener información actualizada
async function actualizeInfo(player, playersAndObjectsInfo, mapInfo) {
    while (player.exists) {
        await new Promise(r => setTimeout(r, 1000)).then( () => {
            getPlayerInfo(player).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Couldn't get the player information! Error code: " + response.status);
                }
            })
            .then(data => {
                player.health = data.vitalpoints;
                player.x = data.x;
                player.y = data.y;
                document.getElementById("health").textContent = ((player.health / player.originalHealth) * 100).toFixed(1) + "%";

                if (player.health <= 0) {

                    if (document.getElementById("dead") != null) {
                        document.getElementById("dead").style.visibility = "visible";
                    }
                }
            })
            .catch(error => console.error(error));

            getMapInfo(player).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Couldn't get map information! Error code: " + response.status);
                }
            })
            .then(data => {
                mapInfo = data;
                actualizeMinimap(player, mapInfo);  //Actualizamos el minimapa
            })
            .catch(error => console.error(error));

            getPlayersObjectsInfo(player).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Couldn't get information of players and objects! Error code: " + response.status);
                }
            })
            .then(data => {
                playersAndObjectsInfo = data;
                showEnemiesInFront(player, playersAndObjectsInfo);
            })
            .catch(error => console.error(error));
        });
    }
}

//Función que nos permite saber qué imagen hemos de mostrar en el visor, dependiendo de nuestra posición y nuestra dirección
function getPlayerView(player) {

    var visor = document.createElement("div");
    visor.className = "visor";
    visor.id = "visor";
    
    if (player.d == "N") {

        if (player.x == 0) {

            if (player.y == 38) {

                visor.style.backgroundImage = "url(assets/sin_pared_derecha.png)";
            }
            else {

                if (player.y == 39) {

                    visor.style.backgroundImage = "url(assets/pared.png)";
                }
                else {

                    visor.style.backgroundImage = "url(assets/sin_pared_delante_derecha.png)";
                }
            }
        }
        else {

            if (player.x == 39) {

                if (player.y == 38) {
    
                    visor.style.backgroundImage = "url(assets/sin_pared_izquierda.png)";
                }
                else {

                    if (player.y == 39) {

                        visor.style.backgroundImage = "url(assets/pared.png)";
                    }
                    else {

                        visor.style.backgroundImage = "url(assets/sin_pared_izquierda_delante.png)";
                    }
                }
            }
            else {

                if (player.y == 38) {
    
                    visor.style.backgroundImage = "url(assets/sin_pared_izquierda_derecha.png)";
                }
                else {

                    if (player.y == 39) {

                        visor.style.backgroundImage = "url(assets/pared.png)";
                    }
                    else {

                        visor.style.backgroundImage = "url(assets/sin_paredes.png)";
                    }
                }
            }
        }
    }

    if (player.d == "S") {

        if (player.x == 0) {

            if (player.y == 1) {
    
                visor.style.backgroundImage = "url(assets/sin_pared_izquierda.png)";
            }
            else {

                if (player.y == 0) {

                    visor.style.backgroundImage = "url(assets/pared.png)";
                }
                else {

                    visor.style.backgroundImage = "url(assets/sin_pared_izquierda_delante.png)";
                }
            }
        }
        else {

            if (player.x == 39) {

                if (player.y == 1) {

                    visor.style.backgroundImage = "url(assets/sin_pared_derecha.png)";
                }
                else {

                    if (player.y == 0) {

                        visor.style.backgroundImage = "url(assets/pared.png)";
                    }
                    else {

                        visor.style.backgroundImage = "url(assets/sin_pared_delante_derecha.png)";
                    }
                }
            }
            else {

                if (player.y == 1) {

                    visor.style.backgroundImage = "url(assets/sin_pared_izquierda_derecha.png)";
                }
                else {

                    if (player.y == 0) {

                        visor.style.backgroundImage = "url(assets/pared.png)";
                    }
                    else {

                        visor.style.backgroundImage = "url(assets/sin_paredes.png)";
                    }
                }
            }
        }
    }

    if (player.d == "E") {

        if (player.y == 39) {

            if (player.x == 38) {

                visor.style.backgroundImage = "url(assets/sin_pared_derecha.png)";
            }
            else {

                if (player.x == 39) {

                    visor.style.backgroundImage = "url(assets/pared.png)";
                }
                else {

                    visor.style.backgroundImage = "url(assets/sin_pared_delante_derecha.png)";
                }
            }
        }
        else {

            if (player.y == 0) {

                if (player.x == 38) {
    
                    visor.style.backgroundImage = "url(assets/sin_pared_izquierda.png)";
                }
                else {

                    if (player.x == 39) {

                        visor.style.backgroundImage = "url(assets/pared.png)";
                    }
                    else {

                        visor.style.backgroundImage = "url(assets/sin_pared_izquierda_delante.png)";
                    }
                }
            }
            else {

                if (player.x == 38) {
    
                    visor.style.backgroundImage = "url(assets/sin_pared_izquierda_derecha.png)";
                }
                else {

                    if (player.x == 39) {

                        visor.style.backgroundImage = "url(assets/pared.png)";
                    }
                    else {

                        visor.style.backgroundImage = "url(assets/sin_paredes.png)";
                    }
                }
            }
        }
    }

    if (player.d == "O") {

        if (player.y == 39) {

            if (player.x == 1) {

                visor.style.backgroundImage = "url('assets/sin_pared_izquierda.png')";
            }
            else {

                if (player.x == 0) {

                    visor.style.backgroundImage = "url(assets/pared.png)";
                }
                else {

                    visor.style.backgroundImage = "url('assets/sin_pared_izquierda_delante.png')";
                }
            }
        }
        else {

            if (player.y == 0) {

                if (player.x == 1) {
    
                    visor.style.backgroundImage = "url('assets/sin_pared_derecha.png')";
                }
                else {

                    if (player.x == 0) {

                        visor.style.backgroundImage = "url(assets/pared.png)";
                    }
                    else {

                        visor.style.backgroundImage = "url('assets/sin_pared_delante_derecha.png')";
                    }
                }
            }
            else {

                if (player.x == 1) {
    
                    visor.style.backgroundImage = "url('assets/sin_pared_izquierda_derecha.png')";
                }
                else {

                    if (player.x == 0) {

                        visor.style.backgroundImage = "url(assets/pared.png)";
                    }
                    else {

                        visor.style.backgroundImage = "url('assets/sin_paredes.png')";
                    }
                }
            }
        }
    }

    return visor;
}

//Función que nos permite actualizar la brújula, cambiando el color a verde de la dirección de nuestro jugador
function actualizeCompass(player) {

    if (document.getElementById("top") != null && document.getElementById("bottom") != null && document.getElementById("left") != null && document.getElementById("right") != null) {

        document.getElementById("top").style.color = "white";
        document.getElementById("bottom").style.color = "white";
        document.getElementById("left").style.color = "white";
        document.getElementById("right").style.color = "white";

        switch (player.d) {
            case "N":  
                document.getElementById("top").style.color = "yellowgreen";
                document.getElementById("bottom").style.color = "white";
                document.getElementById("left").style.color = "white";
                document.getElementById("right").style.color = "white";
                break;
            case "E":  
                document.getElementById("top").style.color = "white";
                document.getElementById("bottom").style.color = "white";
                document.getElementById("left").style.color = "white";
                document.getElementById("right").style.color = "yellowgreen";
                break;
            case "S":  
                document.getElementById("top").style.color = "white";
                document.getElementById("bottom").style.color = "yellowgreen";
                document.getElementById("left").style.color = "white";
                document.getElementById("right").style.color = "white";
                break;
            case "O":  
                document.getElementById("top").style.color = "white";;
                document.getElementById("bottom").style.color = "white";
                document.getElementById("left").style.color = "yellowgreen";
                document.getElementById("right").style.color = "white";
                break;
        }
    }
}

//Función que permite actualizar el minimapa, indicando la dirección y posición de los enemigos
function actualizeMinimap(player, mapInfo) {

    if (document.getElementById("view") != null) {
        
        for (var i = 0; i < 11; i++) {

            for (var u = 0; u < 11; u++) {

                if (!(i == 5 && u == 5)) {

                    document.getElementsByClassName("minimapSquare")[i * 11 + u].style.background = "white";
                }
            } 
        } 
        
        if (player.exists) {

            mapInfo.enemies.forEach(enemy => {
                
                var fila;
                var columna;
                
                for (var i = 0; i < 11; i++) {

                    fila = 5 - i;

                    for (var u = 0; u < 11; u++) {

                        columna = -5 + u;
                        
                        if (parseInt(enemy.x) == parseInt(player.x) + columna && parseInt(enemy.y) == parseInt(player.y) + fila && !(columna == 0 && fila == 0)) {
                            
                            switch (enemy.direction) {
                                case "N":  
                                    document.getElementsByClassName("minimapSquare")[i * 11 + u].style.background = "linear-gradient(0deg, rgba(121,9,9,1) 67%, rgba(141,8,8,1) 67%, rgba(255,0,0,1) 100%)";
                                    break;
                                case "E":  
                                    document.getElementsByClassName("minimapSquare")[i * 11 + u].style.background = "linear-gradient(90deg, rgba(121,9,9,1) 67%, rgba(141,8,8,1) 67%, rgba(255,0,0,1) 100%)";
                                    break;
                                case "S":  
                                    document.getElementsByClassName("minimapSquare")[i * 11 + u].style.background = "linear-gradient(180deg, rgba(121,9,9,1) 67%, rgba(141,8,8,1) 67%, rgba(255,0,0,1) 100%)";
                                    break;
                                case "O":  
                                    document.getElementsByClassName("minimapSquare")[i * 11 + u].style.background = "linear-gradient(270deg, rgba(121,9,9,1) 67%, rgba(141,8,8,1) 67%, rgba(255,0,0,1) 100%)";
                                    break;
                            }
                        }

                        if (parseInt(player.x) + columna < 0 || parseInt(player.x) + columna > 39 || parseInt(player.y) + fila < 0 || parseInt(player.y) + fila > 39) {

                            document.getElementsByClassName("minimapSquare")[i * 11 + u].style.background = "grey";
                        }
                    } 
                } 
            });
        }
    }
}

//Ejecutamos el código contenido en cuanto cargue el documento
document.addEventListener("DOMContentLoaded", function (){

    var groupToken = "b89f979e";
    var player = new Player(groupToken);
    var mapInfo;
    var playersAndObjectsInfo;

    var grid = document.createElement("DIV");
    grid.className = "grid";
    grid.setAttribute("id", "grid");

    var options = document.createElement("DIV");
    options.className = "options";
    options.setAttribute("id", "options");
    grid.appendChild(options);

    var new_player = document.createElement("BUTTON");
    new_player.innerHTML = "New Player";
    new_player.onmousedown = function() {newPlayer(player, playersAndObjectsInfo, mapInfo)};
    new_player.className = "new_player";
    options.appendChild(new_player);

    var respawn = document.createElement("BUTTON");
    respawn.innerHTML = "Respawn";
    respawn.onmousedown = function() {respawnFromDeath(player)};
    respawn.className = "respawn";
    options.appendChild(respawn);

    var delete_player = document.createElement("BUTTON");
    delete_player.innerHTML = "Delete Player";
    delete_player.onmousedown = function() {deletePlayer(player)};
    delete_player.className = "delete_player";
    options.appendChild(delete_player);

    var avatar = document.createElement("DIV");
    avatar.className = "avatar";
    avatar.setAttribute("id", "avatar");
    options.appendChild(avatar);

    var player_name = document.createElement("DIV");
    player_name.className = "player_name";
    player_name.setAttribute("id", "player_name");
    var player_name_txt = document.createTextNode("Player Name: ");
    player_name_txt.className = "player_name_txt";
    player_name.appendChild(player_name_txt);
    options.appendChild(player_name);

    var name = document.createElement("DIV");
    name.className = "name";
    name.setAttribute("id", "name");
    var name_txt = document.createTextNode("");
    name_txt.className = "name_txt";
    name.appendChild(name_txt);
    options.appendChild(name);

    var player_health = document.createElement("DIV");
    player_health.className = "player_health";
    player_health.setAttribute("id", "player_health");
    var player_health_txt = document.createTextNode("Health: ");
    player_health_txt.className = "player_health_txt";
    player_health.appendChild(player_health_txt);
    options.appendChild(player_health);

    var health = document.createElement("DIV");
    health.className = "health";
    health.setAttribute("id", "health");
    health.textContent = "";
    options.appendChild(health);

    var player_attack = document.createElement("DIV");
    player_attack.className = "player_attack";
    player_attack.setAttribute("id", "player_attack");
    var player_attack_txt = document.createTextNode("Attack: ");
    player_attack_txt.className = "player_attack_txt";
    player_attack.appendChild(player_attack_txt);
    options.appendChild(player_attack);

    var attack = document.createElement("DIV");
    attack.className = "attack";
    attack.setAttribute("id", "attack");
    attack.textContent = "";
    options.appendChild(attack);

    var player_defense = document.createElement("DIV");
    player_defense.className = "player_defense";
    player_defense.setAttribute("id", "player_defense");
    var player_defense_txt = document.createTextNode("Defense: ");
    player_defense_txt.className = "player_defense_txt";
    player_defense.appendChild(player_defense_txt);
    options.appendChild(player_defense);

    var defense = document.createElement("DIV");
    defense.className = "defense";
    defense.setAttribute("id", "defense");
    defense.textContent = "";
    options.appendChild(defense);

    var game = document.createElement("DIV");
    game.className = "game";
    game.setAttribute("id", "game");
    grid.appendChild(game);

    createPlayerMessage(game);
    
    var view = document.createElement("DIV");
    view.className = "view";
    view.setAttribute("id", "view");
    grid.appendChild(view);

    for (var i = 1; i <= 121; i++) {
        var item1 = document.createElement("DIV");
        item1.className = "minimapSquare";
        item1.setAttribute("id", "item"+i+"");
        view.appendChild(item1);
        item1.style.background = "white";
    }

    var compass_keys = document.createElement("DIV");
    compass_keys.className = "compass_keys";
    compass_keys.setAttribute("id", "compass_keys");
    grid.appendChild(compass_keys);

    var compass = document.createElement("DIV");
    compass.className = "compass";
    compass.setAttribute("id", "compass");
    compass_keys.appendChild(compass);

    var top = document.createElement("DIV");
    top.className = "top";
    top.setAttribute("id", "top");
    top.textContent = "N";
    compass.appendChild(top);

    var bottom = document.createElement("DIV");
    bottom.className = "bottom";
    bottom.setAttribute("id", "bottom");
    bottom.textContent = "S";
    compass.appendChild(bottom);

    var left = document.createElement("DIV");
    left.className = "left";
    left.setAttribute("id", "left");
    left.textContent = "O";
    compass.appendChild(left);

    var right = document.createElement("DIV");
    right.className = "right";
    right.setAttribute("id", "right");
    right.textContent = "E";
    compass.appendChild(right);

    var attack_keys = document.createElement("DIV");
    attack_keys.className = "attack_keys";
    var attack_keys_txt = document.createTextNode("To attack");
    attack_keys_txt.className = "attack_keys_txt";
    attack_keys.appendChild(attack_keys_txt);
    compass_keys.appendChild(attack_keys);

    var space_key = document.createElement("DIV");
    space_key.className = "space_key";
    space_key.setAttribute("id", "space_key");
    compass_keys.appendChild(space_key);

    var move_keys = document.createElement("DIV");
    move_keys.className = "move_keys";
    var move_keys_txt = document.createTextNode("To move");
    move_keys_txt.className = "move_keys_txt";
    move_keys.appendChild(move_keys_txt);
    compass_keys.appendChild(move_keys);

    var wasd_keys = document.createElement("DIV");
    wasd_keys.className = "wasd_keys";
    wasd_keys.setAttribute("id", "wasd_keys");
    compass_keys.appendChild(wasd_keys);

    document.body.appendChild(grid);

    window.addEventListener('keyup', function() {
        move(player);
    }); 
});