import {readFileSync} from "fs";
import chalk from "chalk";

export const renderErrorMessage = (message: string) => {
	console.error(`%s: ${message}`, chalk.red.bold('ERROR'))
	process.exit(1)
}

export const renderDoneMessage = (message: string) => {
	console.log(`%s: ${message}`, chalk.green.bold('DONE'))
	process.exit(1)
}

export const renderInfoMessage = (message: string) => {
	console.log(`%s: ${message}`, chalk.cyan.bold('INFO'))
}

export const importFile = async (path: string) => {
	return await JSON.parse(readFileSync(path, 'utf8'))
}
