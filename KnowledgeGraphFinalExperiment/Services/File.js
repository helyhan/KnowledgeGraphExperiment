import { readFile } from 'fs/promises';

/**
 * This class provides a static method to read and parse JSON files from a specified directory.
*/
export default class File
{
    /**
     * Reads and parses the first JSON object from a file in the 'data/python-dep' directory.
     * @param {string} fileName - The name of the file to read. The file must be located in the './data/python-dep' directory.
     * @returns {Promise<Object>} - A promise that resolves with the first JSON object from the file.
     * If the file does not exist, cannot be read, or contains invalid JSON, the method logs the error and rethrows it.
     * This allows for handling specific errors where the method is called.
    */
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
