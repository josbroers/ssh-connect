import {renderMessage} from "../lib/utils";
import {addAliases, theAlias} from "../lib/messages";

export default async function aliases(connections: object, path: string) {
	renderMessage(addAliases, 'info')

	Object.entries(connections).forEach(([key, value]) => {
		if (value.alias) {
			renderMessage(theAlias(path, 'connect', value.alias.toLowerCase(), key), null)
		}
	})

	process.exit(1)
}
