import {readFileSync} from "fs";

const importFile = async (path: string) => {
	return await JSON.parse(readFileSync(path, 'utf8'))
}

export default importFile
