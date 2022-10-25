#!/usr/bin/env node

import prepareScript from "../lib/prepareScript";
import importFile from "../lib/importFile";
import inquirer from "inquirer";
import searchList from "inquirer-search-list"
import connect from "./connect";
import add from "./add";
import remove from "./remove";
import {configureServer, passType} from "../lib/messages";
import renderErrorMessage from "../lib/error";

const main = async () => {
	inquirer.registerPrompt("search-list", searchList)

	const args = await prepareScript(inquirer)
	const connections = await importFile(args.path)
	const options = Object.keys(connections)

	if (options.length === 0) {
		console.log(configureServer)
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
				connect(inquirer, connections, options)
				break;
			case 'add':
				add(inquirer, connections, options, args.path)
				break;
			case 'remove':
				remove(inquirer, connections, options, args.path)
				break;
			default:
				throw new Error(passType)
		}
	})
	.catch(({message}) => renderErrorMessage(message))
