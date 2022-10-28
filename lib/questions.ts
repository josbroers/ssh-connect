import {availableTypes} from "./utils";
import {homedir} from "os";

export const chooseServer = (servers: string[]) => {
	return {
		type: 'search-list',
		name: "server",
		message: "Choose a server:",
		choices: servers,
		loop: false,
		pageSize: 20
	}
}

export const chooseType = {
	type: 'list',
	name: 'type',
	message: 'Choose a function:',
	choices: availableTypes,
	default: 'connect'
}

export const fillConnectionsPath = {
	type: 'input',
	name: "path",
	message: 'Fill in the relative path to the connections:',
	default: `${homedir()}/connections.json`
}

export const fillServerName = (serverName?: string) => {
	return {
		type: 'input',
		name: "server",
		message: "What is the name of the server?",
		default: serverName ?? null,
	}
}

export const fillIp = (serverName?: string) => {
	return {
		type: 'input',
		name: "ip",
		message: "What is the IP address?",
		default: serverName ?? null,
	}
}

export const fillOptionalUser = (serverName?: string) => {
	return {
		type: 'string',
		name: "user",
		message: "Optional: Who is the user?",
		default: serverName ?? null,
	}
}

export const fillOptionalPort = (serverName?: number) => {
	return {
		type: 'string',
		name: "port",
		message: "Optional: What is the port?",
		default: serverName ?? null,
	}
}

export const connectAfterCreation = {
	type: 'confirm',
	name: "connect",
	message: "Connect to the server after creation?",
	default: true,
}

export const configFilePath = (defaultPath: string) => {
	return {
		type: 'input',
		name: "configFilePath",
		message: "Define a path to store/read connections",
		default: defaultPath,
	}
}
