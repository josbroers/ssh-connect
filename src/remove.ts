import {writeFileSync} from "fs";
import {chooseConnection} from "../lib/questions";
import {missingConnection} from "../lib/messages";
import {renderMessage} from "../lib/utils";

const remove = async (inquirer, connections: object, options: string[], path: string, connectionName: string | undefined) => {
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

	const oldConnection = connections[connectionName]
	delete connections[connectionName];
	writeFileSync(path, JSON.stringify(connections, null, 2));
	renderMessage(`Removed the following connection:\n\n${JSON.stringify(oldConnection, null, 2)}`, 'success', true)
}

export default remove
