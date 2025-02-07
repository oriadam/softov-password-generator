function genPass({
					 minLength = 10,
					 easyToRead = false,
					 addSymbols = false,
				 })
{

	let pw = '';
	const symbols = '!@#$%^&*_+-=;.?';
	const digits = '0123456789';
	const rndStr = (str) => str.charAt(Math.floor(Math.random() * str.length));

	if (easyToRead)
	{
		const rndWord = () =>
		{
			const vowels = 'aeiouy';
			const consonants = 'bcdfghjklmnpqrstvwxz';
			const word = [];
			const len = 2 + Math.floor(Math.random() * 2);
			for (let i = 0; i < len; i++)
				word.push(rndStr(i === 1 ? vowels : consonants));
			if (Math.random() > 0.5)
				word[0] = word[0].toUpperCase();
			if (Math.random() > 0.5)
				word.push(rndStr(vowels));
			return word.join('');
		};
		if (addSymbols)
			pw = rndStr(symbols);
		pw += rndStr(digits) + rndStr('12345678') + rndStr(digits) + rndStr(digits); // second digit is not 0 so it won't be confused with a year by chance
		while (pw.length < minLength)
			pw = rndWord() + pw;
	}
	else
	{
		while (pw.length < minLength)
			pw += Math.random().toString(36).substring(5); // remove '0.' and some more chars
		// add capital letters
		pw = pw.split('').map(l => Math.random() < 0.4 ? l.toUpperCase() : l).join('');
		if (addSymbols)
		{
			// add symbols
			let countSymbols = Math.ceil(Math.random() * 3);
			while (countSymbols--)
			{
				const pos = Math.ceil(Math.random() * (pw.length - 1));
				pw = pw.slice(0, pos) + rndStr(symbols) + pw.slice(pos);
			}
		}
	}

	return pw;
}
