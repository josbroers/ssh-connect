import {readFileSync} from "fs";
import chalk from "chalk";
import {resolve} from "path";
import {homedir} from "os";

export const availableTypes = [
	'connect',
	'add',
	'remove',
	'configure',
	'list',
	'edit',
	'get',
	'aliases'
].sort()

export const aliases = {
	'con': 'connect',
	'add': 'add',
	'rm': 'remove',
	'ls': 'list',
	'edit': 'edit',
	'get': 'get',
	'alias': 'aliases'
}

export function renderMessage(message: string, type?: 'error' | 'info' | 'warning' | 'success', exit?: boolean, suffix?: string) {
	switch (type) {
		case "success":
			console.log(`%s: ${message}`, chalk.green.bold(suffix ?? type.toUpperCase()))
			break
		case "error":
			console.error(`%s: ${message}`, chalk.red.bold(suffix ?? type.toUpperCase()))
			break
		case "warning":
			console.warn(`%s: ${message}`, chalk.yellow.bold(suffix ?? type.toUpperCase()))
			break
		case "info":
			console.log(`%s: ${message}`, chalk.cyan.bold(suffix ?? type.toUpperCase()))
			break
		default:
			console.log(message)
	}

	if (exit) {
		process.exit(1)
	}
}

export async function importFile(path: string) {
	return await JSON.parse(readFileSync(resolve(process.cwd(), path), 'utf8'))
}
