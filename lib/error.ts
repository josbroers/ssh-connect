import chalk from "chalk";

const renderErrorMessage = (message: string) => {
	console.error(`%s: ${message}`, chalk.red.bold('ERROR'))
	process.exit(1)
}

export default renderErrorMessage
