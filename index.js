#!/usr/bin/env node

import chalk        from 'chalk'
import inquirer     from 'inquirer';
import connections  from './connections.json' assert { type: 'json' };
import { execSync } from "child_process";

inquirer
	.prompt( [
		{
			type:     'list',
			name:     "server",
			message:  "Choose a server to connect to:",
			choices:  Object.keys( connections ).sort(),
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
	.catch( function ( e ) {
		console.error( chalk.red.bold( e ) )
		process.exit( 1 )
	} );

