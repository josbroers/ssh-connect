#!/usr/bin/env node

import chalk            from "chalk";
import { connect }      from "./connect.js";
import { add }          from "./add.js";
import { readFileSync } from "fs";
import inquirer         from "inquirer";
import { resolve }      from 'path'

async function cli() {
	const questions = []

	if ( !process.argv.slice( 2 )[ 0 ] ) {
		questions.push( {
			type:    'list',
			name:    'type',
			message: 'Choose a function',
			choices: [ 'connect', 'add' ],
			default: 'connect'
		} )
	}

	if ( !process.argv.slice( 2 )[ 1 ] ) {
		questions.push( {
			type:    'input',
			name:    "path",
			message: 'Fill in the relative path to the connections',
			default: 'ssh-connect/connections.json'
		} )
	}

	return questions
}

cli()
	.then( async function ( questions ) {
		await inquirer
			.prompt( questions )
			.then( async function ( { type, path } ) {
				const resolvedPath = resolve( process.cwd(), path ?? process.argv.slice( 2 )[ 1 ] )

				return {
					type:        type ?? process.argv.slice( 2 )[ 0 ],
					path:        resolvedPath,
					connections: await JSON.parse( readFileSync( resolvedPath, 'utf8' ) )
				};
			} )
			.then( function ( { type, path, connections } ) {
				switch ( type ) {
					case 'connect':
						connect( connections )
						break;
					case 'add':
						add( connections, path )
						break;
					default:
						throw new Error( 'Please pass one of the following options: connect or add' )
				}
			} )
	} )
	.catch( function ( e ) {
		console.error( chalk.red.bold( e ) )
		process.exit( 1 )
	} )
