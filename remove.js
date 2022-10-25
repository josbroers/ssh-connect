#!/usr/bin/env node

import inquirer          from 'inquirer';
import { writeFileSync } from "fs";

/**
 * Remove a server from `connections.json`
 * @param connections
 * @param servers
 * @param path
 */
export function remove( connections, servers, path ) {
	inquirer
		.prompt( [
			{
				type:     'list',
				name:     "server",
				message:  "Choose a server to remove:",
				choices:  servers,
				loop:     false,
				pageSize: 20
			}
		] )
		.then( function ( answers ) {
			if ( !connections[ answers.server ] ) {
				throw new Error( `The server ${answers.server} doesn't exist.` )
			}

			delete connections[ answers.server ];
			writeFileSync( path, JSON.stringify( connections, null, 2 ) );

			process.exit( 1 )
		} )
}
