#!/usr/bin/env node

import { writeFileSync } from "fs";
import { execSync }      from "child_process";

/**
 * Add a new server to `connections.json`
 * @param inquirer
 * @param connections
 * @param path
 */
export function add( inquirer, connections, path ) {
	inquirer
		.prompt( [
			{
				type:    'input',
				name:    "server",
				message: "What is the name of the server?",
			},
			{
				type:    'input',
				name:    "ip",
				message: "What is the IP address?",
			},
			{
				type:    'string',
				name:    "user",
				message: "Optional: Who is the user?",
			},
			{
				type:    'string',
				name:    "port",
				message: "Optional: What is the port?",
			},
			{
				type:    'confirm',
				name:    "connect",
				message: "Connect to the server after creation?",
				default: true,
			}
		] )
		.then( function ( answers ) {
			const user    = answers.user ? answers.user : ''
			const port    = answers.port ? answers.port : ''
			const servers = {
				...connections,
				[ answers.server ]: {
					"ip": answers.ip,
					user,
					port
				}
			}

			writeFileSync( path, JSON.stringify( servers, null, 2 ) );

			if ( answers.connect ) {
				const ip   = answers.ip
				const user = answers.user ? `${answers.user}@` : ''
				const port = answers.port ? `-p ${answers.port}` : ''

				execSync( `ssh ${user}${ip} ${port}`, { stdio: 'inherit' } )
			}

			process.exit( 1 )
		} )
}
