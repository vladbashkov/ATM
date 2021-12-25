let userData = {
		'USD': 1000,
		'EUR': 900,
		'UAH': 15000,
		'BIF': 20000,
		'AOA': 100
	},
	bankData = {
		'USD': {
			max: 3000,
			min: 100,
			img: '💵'
		},
		'EUR': {
			max: 1000,
			min: 50,
			img: '💶'
		},
		'UAH': {
			max: 0,
			min: 0,
			img: '💴'
		},
		'GBP': {
			max: 10000,
			min: 100,
			img: '💷'
		}
	}

const getMoney = (user, bank) => {
	return new Promise( function(resolve, reject){
		let balance = confirm(`Посмотреть баланс на карте?`);

		balance ? resolve(user) : reject(user, bank);

	});
}

getMoney(userData, bankData)
	.then(
		resolve => {
			let currency;
				do{
					currency = prompt(`Введите название валюты в формате USD, EUR, UAH, BIF, AOA`).toUpperCase();
				}while( userData[currency] == undefined );
				console.log(`Баланс на карте ${userData[currency]} ${currency}`);
		},
		reject => {
			let currencyArr = [];
			for(let key in userData){
				for(let prop in bankData){
					if(prop == key && bankData[prop].max>0){
						currencyArr.push(prop);
					}
				}
			}

			let withdrawals;
			do{
				withdrawals = prompt(`Введите название валюты в формате ${currencyArr.join(`, `)}`).toUpperCase();
			}while(currencyArr.indexOf(withdrawals) == -1);

			let amount;
			do{
				amount = +prompt(`Введите сумму для снятия наличных`)
			}while(isNaN(amount));

			switch(true){
				case bankData[withdrawals].max < amount:
					console.log(`Введенная сумма больше допустимой. Максимальная сумма снятия: ${bankData[withdrawals].max} ${withdrawals}`);
					break;
				case bankData[withdrawals].min > amount:
					console.log(`Введенная сумма меньше допустимой. Минимальная сумма снятия: ${bankData[withdrawals].min} ${withdrawals}`);
					break;
				default:
					console.log(`Вот Ваши денежки ${amount} ${bankData[withdrawals].img}`);
			}
		}
		)
	.finally(
		() => console.log(`Спасибо, хорошего дня 😊`)
		)
















