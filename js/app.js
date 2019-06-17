const Config = {
	lastChange: 'db/lastchange.json',
	db: 		'db/cassetteuy.json',

	log: {
		styles: {
			DEFAULT:'background: #ccc; color: #000; font-weight: bold;', 
			App: 	'background: #000; color: #fff; font-weight: bold;'
		}
	}
};

// Settear global de entorno
const ENV = this;

class DB
{
	static get checkOverride () { return DB.___checkOverride___ }
	static set checkOverride (val /* Bool */)
	{
		DB.___checkOverride___ = val;
		return val;
	}

	static get db () { return DB.___db___ }
	static set db (val /* String|Object */)
	{
		if (!DB.checkOverride || typeof DB.___db___ == 'undefined')
		{
			if (typeof val === 'object')
			{
				// Evito que venga con código malicioso
				val = JSON.stringify(val);
			}

			DB.___db___ = JSON.parse(val);
		} else
		{
			throw('Setteo de singleton de BD no permitido');
		}

		return DB.db;
	}
}

class Entity
{
	// getters / setters
	get classname (){ return this.___classname___ }
	get id () 		{ return this.___id___ }

	// statics
	static get entities () { return Entity.___entities___ }

	static destroy (id /*String*/)
	{
		if (typeof Entity.entities[id] !== 'undefined')
		{
			delete Entity.entities[id];
		} else
		{
			console.warn(`No existe la entidad con ID ${id}`);
		}
	}

	constructor (classname /*String*/, id /*String*/)
	{
		this.___classname___= classname;
		this.___id___ 		= id;

		// Crear un trace coloreado para esta entidad
		let style = Config.log.styles[classname] || Config.log.styles.DEFAULT;
		this.trace = (...args) => console.log(`%c ${this.___classname___}#${this.___id___} >`, style, ...args);

		// Agregar entidad a la lista de entidades
		if (typeof Entity.entities === 'undefined') Entity.___entities___ = {};
		Entity.entities[id] = this;
	}
}

class App extends Entity
{
	// getters / setters
	static get version () { return '0.1' }

	constructor (id /*String*/)
	{
		super('App', id);

		this.trace(`Iniciando "${this.id} App", v${App.version} ©`);
	}

	setupView (el /*DOMElement*/)
	{
		
	}
}

// Todo listo. Crear la app
let app = new App('CassetteUY');
app.setupView(document.body);