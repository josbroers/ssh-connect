import {execSync} from "child_process";
import {chooseConnection} from "../lib/questions";
import {misconfiguredConnection} from "../lib/messages";
import {renderMessage} from "../lib/utils";

export default async function connect(inquirer: any, connections: object, options: string[], connectionName: string | undefined) {
	if (!connectionName) {
		await inquirer
			.prompt([chooseConnection(options)])
			.then(({connection}) => {
				connectionName = connection
			})
			.catch(({message}) => renderMessage(message, 'error', true))
	}

	if (!connections[connectionName] || !connections[connectionName].ip) {
		throw new Error(misconfiguredConnection(connectionName))
	}

	const selectedConnection = connections[connectionName]
	const ip = selectedConnection.ip
	const user = selectedConnection.user ? `${selectedConnection.user}@` : ''
	const port = selectedConnection.port ? `-p ${selectedConnection.port}` : ''

	execSync(`ssh ${user}${ip} ${port}`, {stdio: 'inherit'})
	process.exit(1)
}
