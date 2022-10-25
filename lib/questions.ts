export const chooseServer = (servers: string[]) => {
	return {
		type: 'search-list',
		name: "server",
		message: "Choose a server to remove:",
		choices: servers,
		loop: false,
		pageSize: 20
	}
}

export const chooseType = {
	type: 'list',
	name: 'type',
	message: 'Choose a function:',
	choices: ['connect', 'add', 'remove'],
	default: 'connect'
}

export const fillConnectionsPath = {
	type: 'input',
	name: "path",
	message: 'Fill in the relative path to the connections:',
	default: 'ssh-connect/connections.json'
}

export const fillServerName = {
	type: 'input',
	name: "server",
	message: "What is the name of the server?",
}

export const fillIp = {
	type: 'input',
	name: "ip",
	message: "What is the IP address?",
}

export const fillOptionalUser = {
	type: 'string',
	name: "user",
	message: "Optional: Who is the user?",
}

export const fillOptionalPort = {
	type: 'string',
	name: "port",
	message: "Optional: What is the port?",
}

export const connectAfterCreation = {
	type: 'confirm',
	name: "connect",
	message: "Connect to the server after creation?",
	default: true,
}
