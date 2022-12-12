import {availableTypes} from "./utils";
import {homedir} from "os";

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

export const connectAfterCreation = {
	type: 'confirm',
	name: "connect",
	message: "Connect to the connection after creation?",
	default: true,
}

export function chooseConnection(connections: string[]) {
	return {
		type: 'search-list',
		name: "connection",
		message: "Choose a connection:",
		choices: connections,
		loop: false,
		pageSize: 20
	}
}

export function fillConnectionName(connectionName?: string) {
	return {
		type: 'input',
		name: "connection",
		message: "What is the name of the connection?",
		default: connectionName ?? null,
	}
}

export function fillIp(Ip?: string) {
	return {
		type: 'input',
		name: "ip",
		message: "What is the IP address?",
		default: Ip ?? null,
	}
}

export function fillOptionalUser(user?: string) {
	return {
		type: 'string',
		name: "user",
		message: "Optional: Who is the user?",
		default: user ?? null,
	}
}

export function fillOptionalPort(port?: number) {
	return {
		type: 'string',
		name: "port",
		message: "Optional: What is the port?",
		default: port ?? null,
	}
}

export function fillOptionalAlias(alias?: number) {
	return {
		type: 'string',
		name: "alias",
		message: "Optional: What is the alias?",
		default: alias ?? null,
	}
}

export function configFilePath(defaultPath: string) {
	return {
		type: 'input',
		name: "configFilePath",
		message: "Define a path to store/read connections",
		default: defaultPath,
	}
}
