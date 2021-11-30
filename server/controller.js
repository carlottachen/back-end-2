const homes = require('./db.json');
let globalId = 4;

module.exports = {
	getHouses: (request, response) => {
		response.status(200).send(homes);
	},
	deleteHouse: (request, response) => {
		let {id} = request.params;
		let index = homes.findIndex(el => +el.id === +id);
		homes.splice(index, 1);
		response.status(200).send(homes);
	},
	createHouse: (request, response) => {
		const {address, price, imageURL} = request.body;
		let newHome = {
			id: globalId,
			address,
			price,
			imageURL
		}
		homes.push(newHome);
		response.status(200).send(homes);
		globalId++;
	},
	updateHouse: (request, response) => {
		const {id} = request.params;
		const {type} = request.body;

		let index = homes.findIndex(el => +el.id === +id);

		if(homes[index].price <= 100000 && type === 'minus'){
			response.status(400).send('Price too low');
		}else if(homes[index].price >= 1000000 && type === 'plus'){
			response.status(400).send('House is not worth that much');
		}else if(type === 'plus'){
			homes[index].price = Number(homes[index].price) + 10000;
			response.status(200).send(homes);
		}else if(type === 'minus'){
			homes[index].price = Number(homes[index].price) - 10000;
			response.status(200).send(homes);
		}
	}
}

