const Potion = require('../lib/Potion.js');

test('gets a description of the enemy', () => {
	const enemy = new Enemy('goblin', 'sword');

	expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
	expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});

test('creates a random potion object', () => {
	const potion = new Potion();

	expect(potion.name).toEqual(expect.any(String));
	expect(potion.name.length).toBeGreaterThan(0);
	expect(potion.value).toEqual(expect.any(Number));
});
