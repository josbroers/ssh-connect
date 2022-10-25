import {writeFileSync} from "fs";
import {chooseServer} from "../lib/questions";
import {missingServer} from "../lib/messages";
import {renderDoneMessage, renderErrorMessage} from "../lib/utils";

const remove = (inquirer, connections: object, servers: string[], path: string) => {
	inquirer
		.prompt([chooseServer(servers)])
		.then(function (answers) {
			if (!connections[answers.server]) {
				throw new Error(missingServer(answers.server))
			}

			delete connections[answers.server];
			writeFileSync(path, JSON.stringify(connections, null, 2));
			renderDoneMessage(`Removed connection with the name ${answers.server}`)
			process.exit(1)
		})
		.catch(({message}) => renderErrorMessage(message))
}

export default remove
