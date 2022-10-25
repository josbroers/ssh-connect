import {connectAfterCreation, fillIp, fillOptionalPort, fillOptionalUser, fillServerName} from "../lib/questions";
import {writeFileSync} from "fs";
import {execSync} from "child_process";
import {passIp, passServerName, serverAlreadyExists} from "../lib/messages";
import renderErrorMessage from "../lib/error";

const add = (inquirer: any, connections: object, options: string[], path: string) => {
	inquirer
		.prompt([fillServerName, fillIp, fillOptionalUser, fillOptionalPort, connectAfterCreation])
		.then((answers) => {
			if (!answers.server) throw new Error(passServerName)
			if (!answers.ip) throw new Error(passIp)
			if (options.includes(answers.server)) throw new Error(serverAlreadyExists(answers.server))

			const servers = {
				...connections,
				[answers.server]: {
					"ip": answers.ip,
					...[answers.user ?? undefined],
					...[answers.port ?? undefined]
				}
			}

			writeFileSync(path, JSON.stringify(servers, null, 2));

			if (answers.connect) {
				const ip = answers.ip
				const user = answers.user ? `${answers.user}@` : ''
				const port = answers.port ? `-p ${answers.port}` : ''

				execSync(`ssh ${user}${ip} ${port}`, {stdio: 'inherit'})
			}

			process.exit(1)
		})
		.catch(({message}) => renderErrorMessage(message))
}

export default add
