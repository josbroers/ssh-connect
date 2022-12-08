import {connectAfterCreation, fillIp, fillOptionalPort, fillOptionalUser, fillConnectionName} from "../lib/questions";
import {writeFileSync} from "fs";
import {execSync} from "child_process";
import {passIp, passConnectionName, connectionAlreadyExists} from "../lib/messages";
import {renderMessage} from "../lib/utils";

export default function add(inquirer: any, connections: object, options: string[], path: string, connectionName: string | undefined) {
	console.log(connectionName)
	inquirer
		.prompt([fillConnectionName(connectionName), fillIp(), fillOptionalUser(), fillOptionalPort(), connectAfterCreation])
		.then((answers) => {
			if (!answers.connection) throw new Error(passConnectionName)
			if (!answers.ip) throw new Error(passIp)
			if (options.includes(answers.connection)) throw new Error(connectionAlreadyExists(answers.connection))

			const newConnection = {
				[answers.connection]: {
					"ip": answers.ip,
					"user": answers.user,
					"port": answers.port
				}
			}

			const newConnections = {
				...connections,
				...newConnection
			}

			writeFileSync(path, JSON.stringify(newConnections, null, 2));
			renderMessage(`Added the following connection:\n\n${JSON.stringify(newConnection, null, 2)}`, 'success')

			if (answers.connect) {
				const ip = answers.ip
				const user = answers.user ? `${answers.user}@` : ''
				const port = answers.port ? `-p ${answers.port}` : ''

				execSync(`ssh ${user}${ip} ${port}`, {stdio: 'inherit'})
			}

			process.exit(1)
		})
		.catch(({message}) => renderMessage(message, 'error', true))
}
