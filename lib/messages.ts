export const configureServer = 'No servers defined. Please configure a server...'

export const passType = 'Pass one of the following types: add, connect or remove.'

export const passIp = 'Fill-in an IP address.'

export const passServerName = 'Fill-in a name for the server.'

export const misconfiguredServer = (server: string) => `The server ${server} isn't configured properly.`

export const missingServer = (server: string) => `The server ${server} doesn't exists.`

export const serverAlreadyExists = (server: string) => `A server with the name ${server} already exists.`
