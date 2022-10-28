import {availableTypes} from "./utils";

export const configureServer = 'No servers defined. Please configure a server...'

export const passType = `Pass one of the following types: ${availableTypes.toString()}`

export const passIp = 'Fill-in an IP address'

export const passServerName = 'Fill-in a name for the server'

export const misconfiguredServer = (server: string) => `The server ${server} isn't configured properly`

export const missingServer = (server: string) => `The server ${server} doesn't exists`

export const serverAlreadyExists = (server: string) => `A server with the name ${server} already exists`

export const createdConfigFile = (path: string) => `Successfully created a configuration file here: ${path}`

export const addAliases = "Add the following aliases:"

export const theAlias = (path: string, type: string, key: string) => `alias ssh-${key}="ssh-connect ${type} ${path}"`
