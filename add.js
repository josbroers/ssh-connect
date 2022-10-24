#!/usr/bin/env node

import inquirer          from 'inquirer';
import { writeFileSync } from "fs";

/**
 * Add a new server to `connections.json`
 */
export function add( connections, path ) {
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
			process.exit( 1 )
		} )
}
