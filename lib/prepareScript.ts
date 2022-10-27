import {resolve} from "path";
import {chooseType, configFilePath, fillConnectionsPath} from "./questions";
import {renderMessage} from "./utils";
import {writeFileSync} from "fs";
import {addAliases, createdConfigFile} from "./messages";
import {homedir} from "os";

const createConfig = async (inquirer: any, type: string, path: string | undefined) => {
	if (type !== 'configure') return path
	if (!path) {
		await inquirer
			.prompt([configFilePath(`${homedir()}/connections.json`)])
			.then(({configFilePath}) => path = configFilePath)
			.catch(({message}) => renderMessage(message, 'error', true))
	}

	writeFileSync(path, JSON.stringify({}, null, 2))
	renderMessage(createdConfigFile(path), 'success')
	renderMessage(addAliases(path), 'info', true)
}

const prepareScript = async (inquirer: any) => {
	let type = process.argv.slice(2)[0] ?? undefined
	if (!type) {
		await inquirer
			.prompt([chooseType])
			.then((answers) => {
				type = answers.type
			})
			.catch(({message}) => renderMessage(message, 'error', true))
	}

	let path = await createConfig(inquirer, type, process.argv.slice(2)[1] ?? undefined)
	if (!path) {
		await inquirer
			.prompt([fillConnectionsPath])
			.then((answers) => {
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
