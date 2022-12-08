import {availableTypes} from "./utils";
import chalk from "chalk";

export const configureConnection = 'No connections defined. Please configure a connection...'

export const passType = `Pass one of the following types: ${availableTypes.toString()}`

export const passIp = 'Fill-in an IP address'

export const passConnectionName = 'Fill-in a name for the connection'

export function misconfiguredConnection(connection: string) {
	return `The connection ${connection} isn't configured properly`
}

export function missingConnection(connection: string) {
	return `The connection ${connection} doesn't exists`
}

export function connectionAlreadyExists(connection: string) {
	return `A connection with the name ${connection} already exists`
}

export function createdConfigFile(path: string) {
	return `Successfully created a configuration file here: ${path}`
}

export function theAlias(path: string, type: string, key: string) {
	return `alias ssh-${key}="ssh-connect ${type} ${path}"`
}

export function removedConnection(connection: string) {
	return `Removed the following connection:\n\n${connection}`
}

export function getIPAddress(ip: string) {
	return chalk.bold(ip)
}
