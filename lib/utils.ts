import {readFileSync} from "fs";
import chalk from "chalk";
import {resolve} from "path";

export const availableTypes = [
	'connect',
	'add',
	'remove',
	'configure',
	'list',
	'edit'
].sort()

export const aliases = {
	'con': 'connect',
	'add': 'add',
	'rm': 'remove',
	'ls': 'list',
	'edit': 'edit',
}

export const renderMessage = (message: string, type?: 'error' | 'info' | 'warning' | 'success', exit?: boolean, suffix?: string) => {
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

export const importFile = async (path: string) => {
	return await JSON.parse(readFileSync(resolve(process.cwd(), path), 'utf8'))
}
