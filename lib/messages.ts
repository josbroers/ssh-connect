import {availableTypes} from "./utils";

export const configureServer = 'No servers defined. Please configure a server...\n'

export const passType = `Pass one of the following types: ${availableTypes.toString()}\n`

export const passIp = 'Fill-in an IP address\n'

export const passServerName = 'Fill-in a name for the server\n'

export const misconfiguredServer = (server: string) => `The server ${server} isn't configured properly\n`

export const missingServer = (server: string) => `The server ${server} doesn't exists\n`

export const serverAlreadyExists = (server: string) => `A server with the name ${server} already exists\n`

export const createdConfigFile = (path: string) => `Successfully created a configuration file here: ${path}\n`

export const addAliases = (path: string) => `Add the following aliases:\n
alias ssh-con="ssh-connect connect ${path}"
alias ssh-add="ssh-connect add ${path}"
alias ssh-rm="ssh-connect remove ${path}"
alias ssh-ls="ssh-connect list ${path}"
alias ssh-edit="ssh-connect edit ${path}"
`
