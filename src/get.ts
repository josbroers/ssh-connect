import {writeFileSync} from "fs";
import {chooseConnection} from "../lib/questions";
import {getIPAddress, missingConnection, removedConnection} from "../lib/messages";
import {renderMessage} from "../lib/utils";

export default async function get(inquirer, connections: object, options: string[], path: string, connectionName: string | undefined) {
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

	renderMessage(getIPAddress(connections[connectionName].ip), null, true)
}
