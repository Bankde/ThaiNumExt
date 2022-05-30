import optionsStorage from './options-storage.js';

async function init() {
	function a2t(c) {
		return {
			1: '๑',
			2: '๒',
			3: '๓',
			4: '๔',
			5: '๕',
			6: '๖',
			7: '๗',
			8: '๘',
			9: '๙',
			0: '๐',
		}[c];
	}

	function t2a(c) {
		return {
			'๑': '1',
			'๒': '2',
			'๓': '3',
			'๔': '4',
			'๕': '5',
			'๖': '6',
			'๗': '7',
			'๘': '8',
			'๙': '9',
			'๐': '0',
		}[c];
	}

	const options = await optionsStorage.getAll();
	const {isEnable} = options;
	if (isEnable === false) {
		return;
	}

	const {numOpt} = options;
	let replaceFunc = null;
	let regexGroup = null;
	if (numOpt === 'Thai') {
		replaceFunc = a2t;
		regexGroup = /[1-90]/g;
	} else if (numOpt === 'Arabic') {
		replaceFunc = t2a;
		regexGroup = /[๑-๙๐]/g;
	} else {
		console.error('Unexpected options: ' + numOpt);
		return;
	}

	const elements = document.querySelectorAll('*');
	for (const element of elements) {
		if (element.nodeName.toLowerCase() === 'style') {
			continue;
		}

		for (let j = 0; j < element.childNodes.length; j++) {
			const node = element.childNodes[j];
			if ((node.nodeType === 1 || node.nodeType === 3) && node.nodeName.toLowerCase() !== 'style') {
				const text = node.nodeValue;
				if (text === null) {
					continue;
				}

				const replacedText = text.replace(regexGroup, replaceFunc);
				if (replacedText !== text) {
					node.nodeValue = replacedText;
				}
			}
		}
	}
}

init();
