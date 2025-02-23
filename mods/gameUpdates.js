function startSpire(confirmed) {
	const spireNum = checkIfSpireWorld(true);

	if (!confirmed) {
		game.global.spireDeaths = 0;
		game.global.spireActive = true;

		if (game.global.universe === 2) {
			game.global.spireLevel = Math.floor(game.global.u2SpireCellsBest / 100) + 1;
			if (game.global.spireLevel > 10) game.global.spireLevel = 10;
			if (game.portal.Equality.settings.spire.scalingActive) game.portal.Equality.scalingCount = game.portal.Equality.settings.spire.disabledStackCount;
			if (game.portal.Equality.scalingCount === -1) game.portal.Equality.scalingCount = game.portal.Equality.radLevel;
			manageEqualityStacks();
		}

		setNonMapBox();
		const spireSetting = game.options.menu.mapsOnSpire.enabled;
		if (spireSetting && !checkMapAtZoneWorld()) {
			let highestSpire;
			if (game.global.universe === 1) {
				highestSpire = Math.floor((getHighestLevelCleared() - 99) / 100);
			} else {
				highestSpire = Math.min(1, Math.floor((getHighestLevelCleared() - 225) / 75));
			}

			if (spireSetting === 1 || (spireSetting === 2 && spireNum >= highestSpire - 1) || (spireSetting === 3 && spireNum >= highestSpire)) {
				game.global.fighting = false;
				mapsSwitch();
				if (challengeActive('Berserk')) game.challenges.Berserk.trimpDied();
			} else {
				handleExitSpireBtn();
			}
		} else {
			handleExitSpireBtn();
		}

		if (spireNum === 1) {
			cancelTooltip();
			const uSpire = game.global.universe === 2 ? "Stuffy's Spire" : 'The Spire';
			tooltip(uSpire, null, 'update');
		}

		return;
	}

	cancelTooltip();
}

function autoTrap() {
	const buildingsPerSecond = bwRewardUnlocked('DecaBuild') ? 10 : bwRewardUnlocked('DoubleBuild') ? 2 : 1;
	const trapsCanAfford = Math.min(Math.floor(game.resources.food.owned / 10), Math.floor(game.resources.wood.owned / 10));
	const trapsToBuy = Math.min(trapsCanAfford, buildingsPerSecond);

	if (game.resources.food.owned >= 10 * trapsToBuy && game.resources.wood.owned >= 10 * trapsToBuy) {
		game.resources.food.owned -= 10 * trapsToBuy;
		game.resources.wood.owned -= 10 * trapsToBuy;
		game.buildings.Trap.purchased += trapsToBuy;

		const trapPurchase = game.global.buildingsQueue[0] && game.global.buildingsQueue[0].split('.');
		if (trapPurchase && trapPurchase[0] === `Trap` && Number(trapPurchase[1]) <= buildingsPerSecond) {
			setNewCraftItem();
			return;
		}
		startQueue('Trap', trapsToBuy);
	}
}

u2Mutations.rewardMutation = function (cell) {
	if (!cell.u2Mutation || !cell.u2Mutation.length) return 0;
	if (game.global.spireActive && game.global.universe === 2) {
		this.types.Spire1.onDeath(cell);
		return;
	}

	let reward = game.global.world - 199;
	let rewardMult = 0;
	if (cell.u2Mutation.length >= 2) giveSingleAchieve('Double Trouble');
	let nullText = '';

	for (let x = 0; x < cell.u2Mutation.length; x++) {
		const mut = cell.u2Mutation[x];
		if (mut === 'RGE') {
			rewardMult += this.types.Rage.rewardMult();
			if (this.tree.Ragiffium.purchased) {
				const full = getRecycleValueByRarity(getHeirloomRarity(game.global.world, 1, false, true));
				game.global.nullifium += full * 0.05;
				nullText = '' + prettify(full * 0.05) + '虚空物质和';
			}
		} else if (mut === 'NVA' || mut === 'NVX') {
			rewardMult += this.types.Nova.rewardMult();
			if (this.tree.NovaScruff.purchased && mut == 'NVA') Fluffy.rewardExp(3);
		} else if (mut === 'CMP' || mut === 'CMX') {
			rewardMult += this.types.Compression.rewardMult();
		} else if (mut === 'CSP' || mut === 'CSX') {
			rewardMult += this.types.Swapper.rewardMult();
			if (u2Mutations.tree.RandLoot.purchased) {
				let seconds = Math.floor(cell.cs / 10);
				if (u2Mutations.tree.RandLoot2.purchased) seconds *= 0.75;
				else seconds *= 0.5;

				const eligible = ['food', 'wood', 'metal'];
				let cMessage = '您从乱数敌人身上获得了';
				for (let y = 0; y < eligible.length; y++) {
					const item = eligible[y];
					let cnitem;
					let amt = simpleSeconds(item, seconds);
					amt = scaleLootBonuses(amt, true);

					addResCheckMax(item, amt, true, null, true);
					if (item == "food"){
						cnitem = "食物";
					}
					else if (item == "wood"){
						cnitem = "木头";
					}
					else if (item == "metal"){
						cnitem = "金属";
					}
					cMessage += prettify(amt) + cnitem;

					if (y == eligible.length - 1) cMessage += '';
					else if (y == eligible.length - 2) cMessage += '和';
					else cMessage += '，';
				}

				cMessage += '！';
				message(cMessage, 'Loot', '*dice', null, 'primary');
			}
		}
	}

	reward *= rewardMult;
	reward *= cell.u2Mutation.length;
	if (game.global.desoCompletions > 0) reward *= game.challenges.Desolation.getTrimpMult();
	if (game.global.challengeActive == 'Daily') reward *= 1 + getDailyHeliumValue(countDailyWeight()) / 100;
	if (Fluffy.isRewardActive('bigSeeds')) reward *= 10;
	reward *= u2SpireBonuses.seedDrop();
	reward = calcHeirloomBonus('Staff', 'SeedDrop', reward);
	game.global.mutatedSeeds += reward;
	if (typeof game.global.messages.Loot.seeds === 'undefined') game.global.messages.Loot.seeds = true;
	message('您击杀了那个<i></i>' + this.getName(cell.u2Mutation) + '<i></i>敌人，获得了' + nullText + prettify(reward) + '突变之种！', 'Loot', null, 'seedMessage', 'seeds', null, 'background-color: ' + this.getColor(cell.u2Mutation));
	game.stats.mutatedSeeds.value += reward;
	checkAchieve('mutatedSeeds');

	if (!game.global.runningChallengeSquared) {
		let radonPct = rewardMult * 0.25;
		if (u2Mutations.tree.Radon.purchased) radonPct *= 1.25;

		const radonReward = rewardResource('helium', 1, 99, false, radonPct);
		message('您还从那个突变敌人身上获得了' + prettify(radonReward) + '氡！', 'Loot', heliumIcon(true), 'helium', 'helium');
	}

	if (this.open) {
		const nextCost = this.nextCost();
		if (game.global.mutatedSeeds >= nextCost) {
			if (typeof cancelTooltip2 === 'function') cancelTooltip2(true); /* AT function */
			this.openTree();
		} else {
			const seedElem = document.getElementById('mutTreeWrapper').childNodes[1].childNodes[1];
			const costText = Object.keys(this.tree).length > this.purchaseCount ? '下个突变因子花费：' + prettify(nextCost) : '已购买所有突变因子！';
			const seedText = `Seeds Available: ${prettify(game.global.mutatedSeeds)}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;${costText}`;
			if (seedElem.innerHTML !== seedText) seedElem.innerHTML = seedText;
		}
	}

	this.setAlert();
};
