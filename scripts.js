// class constructor for players

class Player {
    constructor(name) {
        this.name = name;
        this.hp = 500;
    }

    attackA(opponent) {
        const damage = Math.floor(Math.random() * 100) + 1;
        opponent.hp -= damage;
        return `${this.name} used attackA on ${opponent.name} and did ${damage} damage.`;
    }

    attackB(opponent) {
        const damage = Math.floor(Math.random() * 34 + 33);
        opponent.hp -= damage;
        return `${this.name} used attackB on ${opponent.name} and did ${damage} damage.`;
    }

    attackC(opponent) {
        const damage = 45;
        opponent.hp -= damage;
        return `${this.name} used attackC on ${opponent.name} and did ${damage} damage.`;
    }

    attackD(attacker) {

        const heal = Math.floor(Math.random() * 34 + 33);
        const totalHp = attacker.hp + heal;

        if (totalHp > 501) {
            attacker.hp = 500;
            let maxheal = heal - (totalHp - 500);
            return `${this.name} used attackD and healed itself by ${maxheal} hp points.`
        } else {
            attacker.hp = totalHp;
            return `${this.name} used attackD and healed itself by ${heal} hp points.`
        }
    }

    get isAlive() {
        return this.hp > 0;
    }
}

// DOM module

const domModule = (function DomModule() {

    const player1Announcement = function(player) {
        const div = document.querySelector("#player1-name");
        div.innerText = `Player 1: ${player.name}`
    }

    const player2Announcement = function(player) {
        const div = document.querySelector("#player2-name");
        div.innerText = `Player 2: ${player.name}`
    }

    const playerAnnouncement = function(player1, player2) {
        const div = document.querySelector(".player-announcements");
        const paragraph = document.createElement("p");
        const text = document.createTextNode(`A battle has started between ${player1.name} vs ${player2.name}!`);
        paragraph.appendChild(text);
        div.appendChild(paragraph);
    }

    const attackAnnouncements = function(attackResult) {
        const div = document.querySelector(".player-announcements");
        const paragraph = document.createElement("p");
        const text = document.createTextNode(`${attackResult} `);
        paragraph.appendChild(text);
        div.appendChild(paragraph);
    }

    const hpAnnouncements = function(checkAlive) {
        const div = document.querySelector(".player-announcements");
        const paragraph = document.createElement("p");
        const text = document.createTextNode(`${checkAlive} `);
        paragraph.appendChild(text);
        div.appendChild(paragraph);
    }

    const resetDom = function() {
        const playerDiv = document.querySelector(".player-announcements");
        playerDiv.innerText = "";

        const div1 = document.querySelector("#player1-name");
        div1.innerText = `Player 1: `;

        const div2 = document.querySelector("#player2-name");
        div2.innerText = `Player 2: `
    }

    //TODO: If player is squirtle buttons inner text shows water moves (replicate for other playable characters)

    const dynamicButtons = function(player) {

        const attackAButton = document.querySelector(".attack-a");
        const attackBButton = document.querySelector(".attack-b");
        const attackCButton = document.querySelector(".attack-c");
        const attackDButton = document.querySelector(".attack-d");

        if (player.name === "Squirtle") {
            attackAButton.innerText = `Water Gun`;
            attackBButton.innerText = `Aqua Jet`;
            attackCButton.innerText = `Dive`;
            attackDButton.innerText = `Potion`;
        } else if (player.name === "Charmander") {
            attackAButton.innerText = `Ember`;
            attackBButton.innerText = `Flamethrower`;
            attackCButton.innerText = `Inferno`;
            attackDButton.innerText = `Potion`;
        } else if (player.name === "Bulbasaur") {
            attackAButton.innerText = `Vine Whip`;
            attackBButton.innerText = `Razor Leaf`;
            attackCButton.innerText = `Bullet Seed`;
            attackDButton.innerText = `Potion`;
        } else {
            attackAButton.innerText = `Tackle`;
            attackBButton.innerText = `Body Slam`;
            attackCButton.innerText = `Bite`;
            attackDButton.innerText = `Potion`;
        }
    }

    //TODO: Make a historical record of past attacks

    return { playerAnnouncement, attackAnnouncements, hpAnnouncements, resetDom, player1Announcement, player2Announcement, dynamicButtons }

})();

// playGame module

const playGame = (function PlayGame() {

    let player1, player2;
    let gameRound = 0;
    let gameActive = false;

    const submitPlayer1 = function() {
        
        const submitP1 = document.querySelector(".player1-submit");

        submitP1.addEventListener("click", function() {
            if (!gameActive) {
                let player1Input = document.querySelector("#player1");
                if (player1Input.value === "") {
                    console.log("Missing name for player 1.")    
                } else {
                    player1 = new Player(player1Input.value);
                    domModule.player1Announcement(player1);
                    console.log(player1);
                }
            }
        })
    }

    const submitPlayer2 = function() {
        
        const submitP2 = document.querySelector(".player2-submit");

        submitP2.addEventListener("click", function() {
            if (!gameActive) {
                let player2Input = document.querySelector("#player2");
                if (player2Input.value === "") {
                    console.log("Missing name for player 2.")    
                } else {
                    player2 = new Player(player2Input.value);
                    domModule.player2Announcement(player2);
                    console.log(player2);
                }
            }
        })
    }

    const playableCharacters = function() {

        const squirtleButton = document.querySelector(".squirtle");
        const charmanderButton = document.querySelector(".charmander");
        const bulbasaurButton = document.querySelector(".bulbasaur");

        squirtleButton.addEventListener("click", function() {
            if(!player1) {
                player1 = new Player("Squirtle");
                domModule.player1Announcement(player1);
                console.log(player1);
            } else if (!player2) {
                player2 = new Player("Squirtle");
                domModule.player2Announcement(player2);
                console.log(player2);
            } else {
                console.log("Reset game.")
            }
        })

        charmanderButton.addEventListener("click", function() {
            if(!player1) {
                player1 = new Player("Charmander");
                domModule.player1Announcement(player1);
                console.log(player1);
            } else if (!player2) {
                player2 = new Player("Charmander");
                domModule.player2Announcement(player2);
                console.log(player2);
            } else {
                console.log("Reset game.")
            }
        })

        bulbasaurButton.addEventListener("click", function() {
            if(!player1) {
                player1 = new Player("Bulbasaur");
                domModule.player1Announcement(player1);
                console.log(player1);
            } else if (!player2) {
                player2 = new Player("Bulbasaur");
                domModule.player2Announcement(player2);
                console.log(player2);
            } else {
                console.log("Reset game.")
            }
        })

    }

    const startGame = function() {

        const startButton = document.querySelector(".start");

        startButton.addEventListener("click", function() {

            let player1Input = document.querySelector("#player1");
            let player2Input = document.querySelector("#player2");

            if (!gameActive) {
                if (!player1) {
                    console.log("Player 1 submission required.");
                } else if (!player2) {
                    console.log("Player 2 submission required.");
                } else {  
                    gameActive = true;    
                    domModule.playerAnnouncement(player1, player2);
                    domModule.hpAnnouncements(checkAlive(player1));
                    domModule.hpAnnouncements(checkAlive(player2));
                    domModule.dynamicButtons(player1);
                    player1Input.value = "";
                    player2Input.value = "";
                }
            }
        })
    }

    const resetGame = function() {

        const resetButton = document.querySelector(".reset");

        resetButton.addEventListener("click", function() {

            let player1Input = document.querySelector("#player1");
            let player2Input = document.querySelector("#player2");

            player1Input.value = "";
            player2Input.value = "";

            player1 = null;
            player2 = null;

            gameRound = 0;
            gameActive = false;
            domModule.resetDom();
        })
    }

    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;

    const checkAlive = function(user) {

        if (!user.isAlive) {
            return `${user.name} has died.`;
        }
        return `${user.name} is still alive with ${user.hp} HP.`;
    }

    const play = function(attack) {

        if (gameActive) {
            let attacker, opponent;

            if (gameRound === 0 || gameRound % 2 === 0) {
                attacker = getPlayer1();
                opponent = getPlayer2();
                domModule.dynamicButtons(opponent);
            } else {
                attacker = getPlayer2();
                opponent = getPlayer1();
                domModule.dynamicButtons(opponent);
            }

            if (attacker.isAlive && opponent.isAlive) {
                const attackResult = attacker[attack](opponent);

                domModule.resetDom();
                domModule.attackAnnouncements(attackResult);
                domModule.player1Announcement(getPlayer1());
                domModule.player2Announcement(getPlayer2());
                domModule.hpAnnouncements(checkAlive(getPlayer1()));
                domModule.hpAnnouncements(checkAlive(getPlayer2()));

                gameRound++;
            } else if (!attacker.isAlive) {
                return `${attacker.name} has died.`;
            } else if (!opponent.isAlive) {
                return `${opponent.name} has died.`
            }
        }

    }

    const attack = function() {

        const attackAButton = document.querySelector(".attack-a");
        const attackBButton = document.querySelector(".attack-b");
        const attackCButton = document.querySelector(".attack-c");
        const attackDButton = document.querySelector(".attack-d");

        attackAButton.addEventListener("click", () => play("attackA"));
        attackBButton.addEventListener("click", () => play("attackB"));
        attackCButton.addEventListener("click", () => play("attackC"));
        attackDButton.addEventListener("click", () => play("attackD"));
    }

    const gameController = function() {
        submitPlayer1();
        submitPlayer2();
        playableCharacters();
        startGame();
        attack();
        resetGame();
    }

    return { gameController };
})()

playGame.gameController();