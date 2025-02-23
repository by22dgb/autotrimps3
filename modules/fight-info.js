(function (M) {
	M['fightInfo'] = {
		$worldGrid: document.getElementById('grid'),
		$mapGrid: document.getElementById('mapGrid'),
		changeCellColor: false,
		allExoticIcons: true,
		allPowerfulIcons: true,
		lastProcessedWorld: null,
		lastProcessedMap: null,
		imp: {
			skel: { name: 'Skeletimp', cnname: '脆皮骷髅', icon: '"glyphicon glyphicon-italic"', shadow: '0px 0px 10px #ffffff', color: '#ffffff' },
			exotic: { icon: '"glyphicon glyphicon-sunglasses"', shadow: '0px 0px 10px #fb753f', color: '#ff0000' },
			powerful: { icon: '"glyphicon glyphicon-fire"', shadow: '0px 0px 10px #ff0c55', color: '#ff0c55' },
			fast: { icon: '"glyphicon glyphicon-forward"', shadow: '0px 0px 10px #ffffff', color: '#000000' },
			poison: { icon: '"glyphicon glyphicon-flask"', shadow: '0px 0px 10px #ffffff', color: '#00ff00' },
			wind: { icon: '"icomoon icon-air"', shadow: '0px 0px 10px #ffffff', color: '#99ffff' },
			ice: { icon: '"glyphicon glyphicon-certificate"', shadow: '0px 0px 10px #ffffff', color: '#00ffff' },
			turkimp: { name: 'Turkimp', cnname: '脆皮火鸡', icon: '"icomoon icon-spoon-knife"' }
		},
		powerful: {
			blimp: { name: 'Blimp', cnname: '脆皮飞艇', icon: '"glyphicon glyphicon-plane"' },
			cthulimp: { name: 'Cthulimp', cnname: '脆皮克苏鲁', icon: '"icomoon icon-archive"' },
			improbability: { name: 'Improbability', cnname: '乌有者', icon: '"glyphicon glyphicon-question-sign"' },
			omnipotrimp: { name: 'Omnipotrimp', cnname: '全能者', icon: '"glyphicon glyphicon-fire"' },
			mutimp: { name: 'Mutimp', cnname: '脆皮变异者', icon: '"glyphicon glyphicon-menu-up"' },
			hulking_mutimp: { name: 'Hulking_Mutimp', cnname: '脆皮大型变异者', icon: '" glyphicon glyphicon-chevron-up"' }
		},
		exotics: {
			chronoimp: { name: 'Chronoimp', cnname: '脆皮时者', icon: '"glyphicon glyphicon-hourglass"' },
			feyimp: { name: 'Feyimp', cnname: '脆皮小妖', icon: '"icomoon icon-diamond"' },
			flutimp: { name: 'Flutimp', cnname: '脆皮飘兽', icon: '"glyphicon glyphicon-globe"' },
			goblimp: { name: 'Goblimp', cnname: '脆皮地精', icon: '"icomoon icon-evil"' },
			jestimp: { name: 'Jestimp', cnname: '脆皮弄臣', icon: '"icomoon icon-mask"' },
			magnimp: { name: 'Magnimp', cnname: '脆皮磁王', icon: '"glyphicon glyphicon-magnet"' },
			tauntimp: { name: 'Tauntimp', cnname: '脆皮咚咚', icon: '"glyphicon glyphicon-tent"' },
			titimp: { name: 'Titimp', cnname: '脆皮泰坦', icon: '"icomoon icon-hammer"' },
			venimp: { name: 'Venimp', cnname: '脆皮爱神', icon: '"glyphicon glyphicon-baby-formula"' },
			whipimp: { name: 'Whipimp', cnname: '脆皮鞭者', icon: '"icomoon icon-area-graph"' }
		},
		exoticImps: ['Chronoimp', 'Feyimp', 'Flutimp', 'Goblimp', 'Jestimp', 'Magnimp', 'Tauntimp', 'Titimp', 'Venimp', 'Whipimp', 'Randimp'],
		fastImps: ['Snimp', 'Kittimp', 'Gorillimp', 'Squimp', 'Shrimp', 'Chickimp', 'Frimp', 'Slagimp', 'Lavimp', 'Kangarimp', 'Entimp', 'Fusimp', 'Carbimp', 'Ubersmith', 'Shadimp', 'Voidsnimp', 'Prismimp', 'Sweltimp', 'Indianimp', 'Improbability', 'Neutrimp', 'Cthulimp', 'Omnipotrimp', 'Mutimp', 'Hulking_Mutimp', 'Liquimp', 'Poseidimp', 'Darknimp', 'Horrimp', 'Arachnimp', 'Beetlimp', 'Mantimp', 'Butterflimp', 'Frosnimp', 'Duckimp']
	};

	function updateCell($cell, cell, pallet, customIcon, overrideSpecial, overrideCoords) {
		/* Cell Color */
		$cell.style.color = M.fightInfo.changeCellColor ? pallet.color : $cell.style.color;
		$cell.style.textShadow = pallet.shadow;

		/* Glyph Icon */
		const icon = customIcon || pallet.icon;
		const replaceable = ['fruit', 'Metal', 'gems', 'freeMetals', 'groundLumber', 'Wood', 'Map', 'Any'];
		if (overrideCoords) replaceable.push('Coordination');

		/* Icon Overriding */
		if (!cell.special.length || (overrideSpecial && replaceable.includes(cell.special))) {
			return `<span class=${icon}></span>`;
		}

		return $cell.innerHTML;
	}

	function updateCell($cell, special, specialIcon, isFast, cellStyle) {
		let innerCell = $cell.innerHTML;
		let parent = $cell;
		const { fontSize, width, paddingTop, paddingBottom } = cellStyle;

		if ($cell.children.length >= 1) {
			parent = $cell.children[0];
			if (parent.children.length >= 3) return innerCell;
		}

		if (special) {
			$cell.style.color = $cell.style.color;
			/* $cell.style.textShadow = special.shadow; */
		}

		const emptyField = '<span title="Empty" class="glyphicon glyphicon-heart-empty" style="visibility: hidden;"></span>';

		if (innerCell.trim() === '&nbsp;') {
			innerCell = emptyField;
		}

		let fastIconHtml = '';
		if (isFast) {
			const fastIcon = M['fightInfo'].imp.fast;
			fastIconHtml = `<span title="抢先攻击" class=${fastIcon.icon} style="text-shadow: ${fastIcon.shadow};color: ${fastIcon.color};"></span>`;
		} else {
			fastIconHtml = emptyField;
		}

		let specialIconHtml = '';
		if (specialIcon) {
			specialIconHtml = `<span title="${specialIcon.cnname}" class=${specialIcon.icon} style="text-shadow: ${special.shadow};color: ${$cell.style.color};"></span>`;
		} else {
			specialIconHtml = emptyField;
		}

		innerCell = `
			<div style="display: flex; align-items: center; justify-content: center; style="width:${width};padding-top:${paddingTop};padding-bottom:${paddingBottom};">
				<div style="font-size: ${fontSize}; width: 40px; text-align: center; padding-right: 5px;">${specialIconHtml}</div>
				<div>${innerCell}</div>
				<div style="font-size: ${fontSize}; width: 40px; text-align: center; padding-left: 5px;">${fastIconHtml}</div>
			</div>
		`;

		return innerCell;
	}

	function updateCellContent($cell, cell, cellStyle) {
		const cellName = cell.name.toLowerCase();
		let special = null;
		let specialIcon = null;

		let isFast = M['fightInfo'].fastImps.includes(cell.name);
		if (cell.corrupted && cell.corrupted.startsWith('corrupt')) isFast = false;
		if (cell.u2Mutation && Object.keys(cell.u2Mutation).length !== 0) isFast = false;

		if (cellName.includes('skele')) {
			special = M.fightInfo.imp.skel;
			specialIcon = M.fightInfo.imp.skel;
		} else if (cellName.includes('turkimp') && !game.talents.turkimp2.purchased) {
			special = M.fightInfo.imp.exotic;
			specialIcon = M.fightInfo.imp[cellName];
		} else if (cellName in M['fightInfo'].exotics) {
			special = M.fightInfo.imp.exotic;
			specialIcon = M.fightInfo.allExoticIcons ? M.fightInfo.exotics[cellName] : null;
		} else if (cellName in M['fightInfo'].powerful) {
			special = M.fightInfo.imp.powerful;
			specialIcon = M.fightInfo.allPowerfulIcons ? M.fightInfo.powerful[cellName] : null;
		} else if (cellName.includes('poison')) {
			special = M.fightInfo.imp.poison;
		} else if (cellName.includes('wind')) {
			special = M.fightInfo.imp.wind;
		} else if (cellName.includes('ice')) {
			special = M.fightInfo.imp.ice;
		}

		return updateCell($cell, special, specialIcon, isFast, cellStyle);
	}

	function updateCellTitle($cell, cell) {
		let cnname = cell.name;
		switch (cnname){
			case 'Liquimp': cnname = '液化者'; break;
 			case 'Arachnimp': cnname = '脆皮蜘蛛'; break;
 			case 'Beetlimp': cnname = '脆皮甲虫'; break;
 			case 'Mantimp': cnname = '脆皮螳螂'; break;
 			case 'Butterflimp': cnname = '脆皮蝴蝶'; break;
 			case 'Horrimp': cnname = '脆皮惊骇者'; break;
 			case 'Presimpt': cnname = '脆皮小礼'; break;
 			case 'Turkimp': cnname = '脆皮火鸡'; break;
 			case 'Squimp': cnname = '脆皮乌贼'; break;
 			case 'Elephimp': cnname = '脆皮象'; break;
 			case 'Turtlimp': cnname = '脆皮龟'; break;
 			case 'Chimp': cnname = '脆皮黑猩猩'; break;
 			case 'Penguimp': cnname = '脆皮企鹅'; break;
 			case 'Snimp': cnname = '脆皮蛇'; break;
 			case 'Gorillimp': cnname = '脆皮大猩猩'; break;
 			case 'Blimp': cnname = '脆皮飞艇'; break;
 			case 'Dragimp': cnname = '脆皮龙'; break;
 			case 'Improbability': cnname = '乌有者'; break;
 			case 'Omnipotrimp': cnname = '全能者'; break;
 			case 'Mutimp': cnname = '脆皮变异者'; break;
 			case 'Hulking_Mutimp': cnname = '脆皮大型变异者'; break;
 			case 'Feyimp': cnname = '脆皮小妖'; break;
 			case 'Tauntimp': cnname = '脆皮咚咚'; break;
 			case 'Whipimp': cnname = '脆皮鞭者'; break;
 			case 'Venimp': cnname = '脆皮爱神'; break;
 			case 'Magnimp': cnname = '脆皮磁王'; break;
 			case 'Skeletimp': cnname = '脆皮骷髅'; break;
 			case 'Megaskeletimp': cnname = '脆皮超级骷髅'; break;
 			case 'Pumpkimp': cnname = '脆皮南瓜怪'; break;
 			case 'Shrimp': cnname = '脆皮虾'; break;
 			case 'Mountimp': cnname = '脆皮山怪'; break;
 			case 'Frimp': cnname = '脆皮森精'; break;
 			case 'Chickimp': cnname = '脆皮小鸡'; break;
 			case 'Hippopotamimp': cnname = '脆皮河马'; break;
 			case 'Onoudidimp': cnname = '脆皮蜗牛'; break;
 			case 'Nooimp': cnname = '脆皮喏喏'; break;
 			case 'Platypimp': cnname = '脆皮鸭嘴兽'; break;
 			case 'Duckimp': cnname = '脆皮小鸭'; break;
 			case 'Kittimp': cnname = '脆皮小猫'; break;
 			case 'Grimp': cnname = '脆皮护林者'; break;
 			case 'Golimp': cnname = '脆皮魔像'; break;
 			case 'Seirimp': cnname = '脆皮矿精'; break;
 			case 'Slagimp': cnname = '脆皮炉渣怪'; break;
 			case 'Moltimp': cnname = '脆皮熔金怪'; break;
 			case 'Lavimp': cnname = '脆皮火岩怪'; break;
 			case 'Flowimp': cnname = '脆皮花妖'; break;
 			case 'Kangarimp': cnname = '脆皮袋鼠'; break;
 			case 'Gnomimp': cnname = '脆皮侏儒'; break;
 			case 'Slosnimp': cnname = '脆皮慢蛇'; break;
 			case 'Entimp': cnname = '脆皮树人'; break;
 			case 'Squirrimp': cnname = '脆皮松鼠'; break;
 			case 'Gravelimp': cnname = '脆皮碎石怪'; break;
 			case 'Cthulimp': cnname = '脆皮克苏鲁'; break;
 			case 'Shadimp': cnname = '脆皮暗影怪'; break;
 			case 'Voidsnimp': cnname = '脆皮虚空蛇'; break;
 			case 'Goblimp': cnname = '脆皮地精'; break;
 			case 'Flutimp': cnname = '脆皮飘兽'; break;
 			case 'Jestimp': cnname = '脆皮弄臣'; break;
 			case 'Titimp': cnname = '脆皮泰坦'; break;
 			case 'Chronoimp': cnname = '脆皮时者'; break;
 			case 'Megablimp': cnname = '脆皮超级飞艇'; break;
 			case 'Mitschimp': cnname = '脆皮巨猩猩'; break;
 			case 'Brickimp': cnname = '脆皮砖汉'; break;
 			case 'Indianimp': cnname = '脆皮印第安人'; break;
 			case 'Poseidimp': cnname = '脆皮海王'; break;
 			case 'Warden': cnname = '典狱长'; break;
 			case 'Robotrimp': cnname = '脆皮机器人'; break;
 			case 'Mechimp': cnname = '脆皮机甲'; break;
 			case 'Destructimp': cnname = '脆皮破灭者'; break;
 			case 'Terminatimp': cnname = '脆皮终结者'; break;
 			case 'Autoimp': cnname = '脆皮汽车'; break;
 			case 'Artimp': cnname = '脆皮机器艺术家'; break;
 			case 'Neutrimp': cnname = '脆皮中子怪'; break;
 			case 'Fusimp': cnname = '脆皮聚变怪'; break;
 			case 'Hydrogimp': cnname = '脆皮氢怪'; break;
 			case 'Carbimp': cnname = '脆皮碳怪'; break;
 			case 'Prismimp': cnname = '脆皮棱镜怪'; break;
 			case 'Rainbimp': cnname = '脆皮彩虹兽'; break;
 			case 'Lightimp': cnname = '脆皮光怪'; break;
 			case 'Meltimp': cnname = '脆皮熔怪'; break;
 			case 'Sweltimp': cnname = '脆皮酷热者'; break;
 			case 'Darknimp': cnname = '脆皮暗罪者'; break;
 			case 'Freezo': cnname = '冰雪之王'; break;
 			case 'Frosnimp': cnname = '脆皮寒霜者'; break;
			default: break;
		}
		$cell.title = cnname;

		if (cell.corrupted && cell.corrupted.startsWith('corrupt')) {
			let cntitle = mutationEffects[cell.corrupted].title;
			switch (cntitle){
				case 'Corrupted Stamina': cntitle = '腐化耐力'; break;
				case 'Corrupted Precision': cntitle = '腐化精准'; break;
				case 'Corrupted Sharpness': cntitle = '腐化锋锐'; break;
				case 'Corrupted Strength': cntitle = '腐化力量'; break;
				case 'Corrupted Toughness': cntitle = '腐化坚韧'; break;
				case 'Corrupted Agility': cntitle = '腐化敏捷'; break;
				default: break;
			}
			$cell.title += ` - ${cntitle}`;
		}

		if (cell.u2Mutation !== undefined) {
			cell.u2Mutation.forEach((mut) => {
				let cntitle = u2Mutations.getName([mut]);
				switch (cntitle){
					case 'Raging': cntitle = '暴怒'; break;
					case 'Novad': cntitle = '新星'; break;
					case 'Randomized': cntitle = '乱数'; break;
					case 'Compressed': cntitle = '压缩'; break;
					default: break;
				}
				$cell.title += ` - ${cntitle}`;
				$cell.classList.add(mut);
			});
		}

		return $cell;
	}

	function processCells(cellArray, updates) {
		const cells = game.global.mapsActive ? game.global.mapGridArray : game.global.gridArray;
		const mapSize = cells.length + 1;
		let columns = 10;
		if (game.global.mapsActive) {
			if (mapSize === 150) {
				columns = 15;
			} else {
				columns = Math.floor(Math.sqrt(mapSize));
			}
		}

		const cellStyle = {
			fontSize: `${columns / 14 + 0.5}vh`,
			width: `${100 / columns}%`,
			paddingTop: `${100 / columns / 19}vh`,
			paddingBottom: `${100 / columns / 19}vh`
		};

		cellArray.forEach(($cell, i) => {
			let cell = cells[i];
			const innerHTML = updateCellContent($cell, cell, cellStyle);
			cell = updateCellTitle($cell, cell);
			updates.push({ $cell, innerHTML });
		});

		return updates;
	}

	function createFragment(updates, $rows) {
		let currentRow;
		let rowIndex = 0;
		const fragment = document.createDocumentFragment();
		const columns = $rows[0].childNodes.length;

		updates.forEach(({ $cell, innerHTML }, index) => {
			if (index % columns === 0) {
				currentRow = $rows[rowIndex];
				currentRow.innerHTML = '';
				fragment.appendChild(currentRow);
				rowIndex++;
			}

			const newCell = $cell.cloneNode(true);
			newCell.innerHTML = innerHTML;
			currentRow.appendChild(newCell);
		});

		return fragment;
	}

	function reverseFragment(fragment) {
		const rows = Array.from(fragment.children).reverse();
		const reversedFragment = document.createDocumentFragment();
		rows.forEach((row) => reversedFragment.appendChild(row));
		return reversedFragment;
	}

	function Update() {
		if (game.global.preMapsActive) return;
		if (!(game.global.gridArray && game.global.gridArray[0])) return;

		if (game.global.mapsActive) {
			if (M['fightInfo'].lastProcessedMap === game.global.mapStarted) return;
			M['fightInfo'].lastProcessedMap = game.global.mapStarted;
		} else {
			if (M['fightInfo'].lastProcessedWorld === game.global.world) return;
			M['fightInfo'].lastProcessedWorld = game.global.world;
		}

		const gridElement = game.global.mapsActive ? document.getElementById('mapGrid') : document.getElementById('grid');
		const rowSource = game.global.mapsActive ? M['fightInfo'].$mapGrid.children : M['fightInfo'].$worldGrid.children;
		const $rows = Array.prototype.slice.call(rowSource).reverse();
		const cellArray = $rows.reduce((acc, row) => acc.concat(Array.prototype.slice.call(row.children)), []);

		const updates = processCells(cellArray, []);
		const fragment = createFragment(updates, $rows);
		const reversedFragment = reverseFragment(fragment);

		gridElement.innerHTML = '';
		gridElement.appendChild(reversedFragment);
	}

	M['fightInfo'].Update = Update;
})(atData);
