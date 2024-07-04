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
    const player1 = new Player('Warrior');
    const player2 = new Player('Wizard');
    let gameRound = 0;

    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;

    const checkAlive = function(user) {
        if (!user.isAlive) {
            return `${user.name} has died.`;
        }
        return `${user.name} is still alive with ${user.hp} HP.`;
    }

    const play = function(attack) {
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

    return { play, getPlayer1, getPlayer2 };
}

const game = playGame();
