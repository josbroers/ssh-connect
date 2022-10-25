import {execSync} from "child_process";
import {chooseServer} from "../lib/questions";
import {misconfiguredServer} from "../lib/messages";
import renderErrorMessage from "../lib/error";

const connect = (inquirer: any, connections: object, servers: string[]) => {
	inquirer
		.prompt([chooseServer(servers)])
		.then(({server}) => {
			if (!connections[server] || !connections[server].ip) {
				throw new Error(misconfiguredServer(server))
			}

			const selectedServer = connections[server]
			const ip = selectedServer.ip
			const user = selectedServer.user ? `${selectedServer.user}@` : ''
			const port = selectedServer.port ? `-p ${selectedServer.port}` : ''

			execSync(`ssh ${user}${ip} ${port}`, {stdio: 'inherit'})
			process.exit(1)
		})
		.catch(({message}) => renderErrorMessage(message))
}

export default connect
