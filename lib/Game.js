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

				// test the object creation - this can probably be deleted later
				//console.log(this.currentEnemy, this.player);
				this.startNewBattle();
			});
	};

	Game.prototype.startNewBattle = function () {
		if (this.player.agility > this.currentEnemy.agility) {
			this.isPlayerTurn = true;
		} else {
			this.isPlayerTurn = false;
		}

		console.log('Your stats are as follows:');
		//here is where we call the getStats function created in the Player.js file (aka a method of the player constructor)
		console.table(this.player.getStats());

		//this is where we call the getDescription function created in the Enemy.js file (aka a method of the player constructor)
		//!How do we know this is getting the description from the Enemy.js
		console.log(this.currentEnemy.getDescription());

		//this will invoke the next method in the Game ^^ constructor
		this.battle();
	};

	Game.prototype.battle = function () {
		//if player turn
		//prompt user to attack or use a potion
		//if using a potion
		//display the list of potion objects to use
		//apply seleted potion effect to player
		//if attacking
		//subtract healht from the enemy based on player attack value
		//if enemy turn
		//subtract health from the player based on enemy attack value

		if (this.isPlayerTurn) {
			// player prompts will go here
			inquirer
				.prompt({
					type: 'list',
					message: 'What would you like to do?',
					name: 'action',
					choices: ['Attack', 'Use potion']
				})
				.then(({ action }) => {
					if (action === 'Use potion') {
						if (!this.player.getInventory()) {
							console.log("You don't have any potions!");
							return;
						}
						inquirer
							.prompt({
								type: 'list',
								message: 'Which potion would you like to use?',
								name: 'action',
								choices: this.player
									.getInventory()
									.map((item, index) => `${index + 1}: ${item.name}`)
							})
							.then(({ action }) => {
								const potionDetails = action.split(': ');

								this.player.usePotion(potionDetails[0] - 1);
								console.log(`You used a ${potionDetails[1]} potion.`);
							});
					} else {
						const damage = this.player.getAttackValue();
						this.currentEnemy.reduceHealth(damage);

						console.log(`You attacked the ${this.currentEnemy.name}`);
						console.log(this.currentEnemy.getHealth());
					}
				});
		} else {
			//this is where we call the getDescription function created in the Enemy.js file (aka a method of the player constructor)
			const damage = this.currentEnemy.getAttackValue();
			this.player.reduceHealth(damage);

			console.log(`You were attacked by the ${this.currentEnemy.name}`);
			console.log(this.player.getHealth());
		}
	};
}

module.exports = Game;
