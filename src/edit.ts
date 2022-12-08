import {chooseConnection, fillIp, fillOptionalPort, fillOptionalUser, fillConnectionName} from "../lib/questions";
import {missingConnection} from "../lib/messages";
import {renderMessage} from "../lib/utils";
import {writeFileSync} from "fs";

export default async function remove(inquirer, connections: object, options: string[], path: string, connectionName: string | undefined) {
	if (!connectionName) {
		await inquirer
			.prompt([chooseConnection(options)])
			.then(({connection}) => {
				connectionName = connection
			})
			.catch(({message}) => renderMessage(message, 'error', true))
	}

	if (!connections[connectionName]) {
		throw new Error(missingConnection(connectionName))
	}

	const connection = connectionName

	inquirer
		.prompt([
			fillConnectionName(connection),
			fillIp(connections[connectionName].ip),
			fillOptionalUser(connections[connectionName].user),
			fillOptionalPort(connections[connectionName].port)
		])
		.then((answers) => {
			delete connections[connection];

			const newConnection = {
				[connectionName]: {
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
			renderMessage(`Edited ${connection} to:\n\n${JSON.stringify(newConnection, null, 2)}`, 'success', true)
		})
		.catch(({message}) => renderMessage(message, 'error', true))
}
