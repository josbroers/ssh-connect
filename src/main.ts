#!/usr/bin/env node

import prepareScript from "../lib/prepareScript";
import inquirer from "inquirer";
import searchList from "inquirer-search-list"
import connect from "./connect";
import add from "./add";
import remove from "./remove";
import {configureConnection, passType} from "../lib/messages";
import {importFile, renderMessage} from "../lib/utils";
import list from "./list";
import edit from "./edit";
import get from "./get";
import aliases from "./aliases";

const main = async () => {
	inquirer.registerPrompt("search-list", searchList)

	const args = await prepareScript(inquirer)
	const connections = await importFile(args.path)
	const options = Object.keys(connections)

	if (options.length === 0) {
		renderMessage(configureConnection, 'info')
		args.type = 'add';
	}

	return {
		args,
		connections,
		options: options.sort()
	}
}

main()
	.then(({args, connections, options}) => {
		switch (args.type) {
			case 'connect':
				connect(inquirer, connections, options, args.connectionName)
					.catch(({message}) => renderMessage(message, 'error', true))
				break;
			case 'add':
				add(inquirer, connections, options, args.path, args.connectionName)
				break;
			case 'remove':
				remove(inquirer, connections, options, args.path, args.connectionName)
					.catch(({message}) => renderMessage(message, 'error', true))
				break;
			case 'get':
				get(inquirer, connections, options, args.path, args.connectionName)
					.catch(({message}) => renderMessage(message, 'error', true))
				break;
			case 'list':
				list(connections)
				break;
			case 'edit':
				edit(inquirer, connections, options, args.path, args.connectionName)
					.catch(({message}) => renderMessage(message, 'error', true))
				break;
			case 'aliases':
				aliases(connections, args.path)
					.catch(({message}) => renderMessage(message, 'error', true))
				break;
			default:
				throw new Error(passType)
		}
	})
	.catch(({message}) => renderMessage(message, 'error', true))
