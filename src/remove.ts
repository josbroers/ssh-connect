import {writeFileSync} from "fs";
import {chooseServer} from "../lib/questions";
import {missingServer} from "../lib/messages";
import {renderMessage} from "../lib/utils";

const remove = (inquirer, connections: object, servers: string[], path: string) => {
	inquirer
		.prompt([chooseServer(servers)])
		.then(function (answers) {
			if (!connections[answers.server]) {
				throw new Error(missingServer(answers.server))
			}

			const oldConnection = connections[answers.server]
			delete connections[answers.server];
			writeFileSync(path, JSON.stringify(connections, null, 2));
			renderMessage(`Removed the following connection:\n\n${JSON.stringify(oldConnection, null, 2)}`, 'success', true)
		})
		.catch(({message}) => renderMessage(message, 'error', true))
}

export default remove
