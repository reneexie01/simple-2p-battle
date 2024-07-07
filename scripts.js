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

    get isAlive() {
        return this.hp > 0;
    }
}

// DOM module

const domModule = (function DomModule() {

    const playerAnnouncement = function(player1, player2) {
        const div = document.querySelector(".player-announcements");
        const paragraph = document.createElement("p");
        const text = document.createTextNode(`A battle has started between ${player1.name} vs ${player2.name}!`);
        paragraph.appendChild(text);
        div.appendChild(paragraph);
    }

    const attackAnnouncements = function(attackResult) {
        const div = document.querySelector(".attack-announcements");
        const paragraph = document.createElement("p");
        const text = document.createTextNode(`${attackResult} `);
        paragraph.appendChild(text);
        div.appendChild(paragraph);
    }

    return { playerAnnouncement, attackAnnouncements }

})();

// playGame module

const playGame = (function PlayGame() {

    let player1, player2;
    let gameRound = 0;
    let gameActive = false;

    const startGame = function() {

        const player1Input = document.querySelector("#player1").value;
        const player2Input = document.querySelector("#player2").value;

        const startButton = document.querySelector(".start");

        startButton.addEventListener("click", function() {
            if (player1Input === "" || player2Input === ""){
                console.log("Missing names.");
            } else {
                player1 = new Player(player1Input);
                player2 = new Player(player2Input);   
                gameActive = true;    
                domModule.playerAnnouncement(player1, player2);
                console.log(player1);
                console.log(player2); 
                console.log(gameActive);
                console.log(gameRound);
            }
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
            } else {
                attacker = getPlayer2();
                opponent = getPlayer1();
            }
    
            if (attacker.isAlive && opponent.isAlive) {
                const attackResult = attacker[attack](opponent);
                domModule.attackAnnouncements(attackResult);
                console.log(attackResult);
                console.log(checkAlive(attacker));
                console.log(checkAlive(opponent));
                gameRound++;
            } else {
                return `Someone has died.`;
            }
        }

    }

    const attack = function() {

        const attackAButton = document.querySelector(".attack-a");
        const attackBButton = document.querySelector(".attack-b");
        const attackCButton = document.querySelector(".attack-c");

        attackAButton.addEventListener("click", () => play("attackA"));
        attackBButton.addEventListener("click", () => play("attackB"));
        attackCButton.addEventListener("click", () => play("attackC"));
    }

    return { startGame, attack };
})()

playGame.startGame();
playGame.attack();

