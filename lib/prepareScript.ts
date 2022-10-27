import {resolve} from "path";
import {chooseType, fillConnectionsPath} from "./questions";
import {renderMessage} from "./utils";

const prepareScript = async (inquirer: any) => {
	const questions = []
	let type = process.argv.slice(2)[0] ?? undefined
	let path = process.argv.slice(2)[1] ?? undefined

	if (!type) questions.push(chooseType)
	if (!path) questions.push(fillConnectionsPath)

	if (questions.length !== 0) {
		await inquirer
			.prompt(questions)
			.then(async (answers) => {
				type = answers.type
				path = answers.path
			})
			.catch(({message}) => renderMessage(message, 'error', true))
	}

	return {
		type,
		path: resolve(process.cwd(), path)
	}
}

export default prepareScript
