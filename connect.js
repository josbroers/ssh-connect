#!/usr/bin/env node

import { execSync } from "child_process";

/**
 * Connect to a server listed in `connections.json`
 * @param inquirer
 * @param connections
 * @param servers
 */
export function connect( inquirer, connections, servers ) {
	inquirer
		.prompt( [
			{
				type:     'search-list',
				name:     "server",
				message:  "Choose a server to connect to:",
				choices:  servers,
				loop:     false,
				pageSize: 20
			}
		] )
		.then( function ( answers ) {
			if ( !connections[ answers.server ] || !connections[ answers.server ].ip ) {
				throw new Error( `The server ${answers.server} isn't configured properly.` )
			}

			const server = connections[ answers.server ]
			const ip     = server.ip
			const user   = server.user ? `${server.user}@` : ''
			const port   = server.port ? `-p ${server.port}` : ''

			execSync( `ssh ${user}${ip} ${port}`, { stdio: 'inherit' } )
			process.exit( 1 )
		} )
}
