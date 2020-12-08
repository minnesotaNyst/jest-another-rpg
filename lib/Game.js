const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
	this.roundNumber = 0;
	this.isPlayerTurn = false;
	this.enemies = [];
	this.currentEnemy;
	this.player;

	//we are calling this function in the app.js file
	Game.prototype.initializeGame = function () {
		//fill up the enemy array
		this.enemies.push(new Enemy('goblin', 'sword'));
		this.enemies.push(new Enemy('orc', 'baseball bat'));
		this.enemies.push(new Enemy('skeleton', 'axe'));

		//initilize THIS enemy as the first in the array of enemies
		this.currentEnemy = this.enemies[0];

		//we use inquirer here to initilize a prompte for the user to input the Player name
		inquirer
			.prompt({
				type: 'text',
				name: 'name',
				message: 'What is your name?'
			})
			// destructure name from the prompt object
			.then(({ name }) => {
				this.player = new Player(name);

				// test the object creation
				console.log(this.currentEnemy, this.player);
				this.startNewBattle();
			});
	};
}

module.exports = Game;
