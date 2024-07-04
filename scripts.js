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

function playGame() {

    // TO DO: link the values from the html inputs to the class constructed players upon submission

    let player1, player2;
    let gameRound = 0;
    let gameActive = false;

    const startGame = function() {

        const player1Input = document.querySelector("#player1").value;
        const player2Input = document.querySelector("#player2").value;

        const startButton = document.querySelector(".start");

        startButton.addEventListener("click", function() {
            if (player1Input === "" || player2Input === ""){
                return;
            } else {
                player1 = new Player(player1Input);
                player2 = new Player(player2Input);   
                gameActive = true;       
                console.log(player1);
                console.log(player2); 
                console.log(gameActive);
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
                console.log(attackResult);
                console.log(checkAlive(attacker));
                console.log(checkAlive(opponent));
                gameRound++;
            } else {
                return `Someone has died.`;
            }
        }

    }

    return { play, startGame };
}

const game = playGame();

game.startGame();