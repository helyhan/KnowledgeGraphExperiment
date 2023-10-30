import { readFile } from 'fs/promises';

export default class File
{
    static async parse(fileName)
    {
        try {
            const data = await readFile(`./data/python-dep/${fileName}`, 'utf8')
            return JSON.parse(data)[0]
        } catch (e) {
            console.error('Error reading or parsing the JSON file:', e);
            throw e;
        }
    }
}