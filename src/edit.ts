import {chooseServer, fillIp, fillOptionalPort, fillOptionalUser, fillServerName} from "../lib/questions";
import {missingServer} from "../lib/messages";
import {renderMessage} from "../lib/utils";
import {writeFileSync} from "fs";

const remove = (inquirer, connections: object, servers: string[], path: string) => {
	inquirer
		.prompt([chooseServer(servers)])
		.then(function (answers) {
			if (!connections[answers.server]) {
				throw new Error(missingServer(answers.server))
			}

			const connection = answers.server

			inquirer
				.prompt([
					fillServerName(connection),
					fillIp(connections[answers.server].ip),
					fillOptionalUser(connections[answers.server].user),
					fillOptionalPort(connections[answers.server].port)
				])
				.then((answers) => {
					delete connections[connection];

					const newServer = {
						[answers.server]: {
							"ip": answers.ip,
							"user": answers.user,
							"port": answers.port
						}
					}

					const servers = {
						...connections,
						...newServer
					}

					writeFileSync(path, JSON.stringify(servers, null, 2));
					renderMessage(`Edited ${connection} to:\n\n${JSON.stringify(newServer, null, 2)}`, 'success', true)
				})
				.catch(({message}) => renderMessage(message, 'error', true))
		})
		.catch(({message}) => renderMessage(message, 'error', true))
}

export default remove
