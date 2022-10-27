import {readFileSync} from "fs";
import chalk from "chalk";

export const renderMessage = (message: string, type: 'error' | 'info' | 'warning' | 'done' = 'info', exit = false) => {
	switch (type) {
		case "done":
			console.log(`%s: ${message}`, chalk.green.bold(type.toUpperCase()))
			break
		case "error":
			console.error(`%s: ${message}`, chalk.red.bold(type.toUpperCase()))
			break
		case "warning":
			console.warn(`%s: ${message}`, chalk.yellow.bold(type.toUpperCase()))
			break
		case "info":
		default:
			console.log(`%s: ${message}`, chalk.cyan.bold(type.toUpperCase()))
	}

	if (exit) {
		process.exit(1)
	}
}

export const importFile = async (path: string) => {
	return await JSON.parse(readFileSync(path, 'utf8'))
}
