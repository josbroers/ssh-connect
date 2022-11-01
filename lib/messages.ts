import {availableTypes} from "./utils";

export const configureConnection = 'No connections defined. Please configure a connection...'

export const passType = `Pass one of the following types: ${availableTypes.toString()}`

export const passIp = 'Fill-in an IP address'

export const passConnectionName = 'Fill-in a name for the connection'

export const misconfiguredConnection = (connection: string) => `The connection ${connection} isn't configured properly`

export const missingConnection = (connection: string) => `The connection ${connection} doesn't exists`

export const connectionAlreadyExists = (connection: string) => `A connection with the name ${connection} already exists`

export const createdConfigFile = (path: string) => `Successfully created a configuration file here: ${path}`

export const addAliases = "Add the following aliases:"

export const theAlias = (path: string, type: string, key: string) => `alias ssh-${key}="ssh-connect ${type} ${path}"`
