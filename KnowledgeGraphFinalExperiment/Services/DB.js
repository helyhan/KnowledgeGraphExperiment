import neo4j from 'neo4j-driver';

/**
 * This class provides a static method to interact with a Neo4j database.
 * It handles the connection, execution, and closing of queries securely.
*/
export default class DB
{
    // The URL of the Neo4j database
    static URL = 'XXX' 
    // Username for database authentication
    static USER = 'XXX'
    // Password for database authentication
    static PASSWORD = 'XXX'

    /**
     * Executes a given Cypher command on the Neo4j database with the specified parameters.
     * @param {string} command - The Cypher query to execute.
     * @param {Object} params - An object containing the parameters for the query.
     * @returns {Promise<neo4j.Result>} - A promise that resolves with the result of the query.
     * This method ensures that the session and driver are properly closed after the operation,
     * regardless of whether it succeeds or fails.
    */
    static async run(command, params)
    {
        const driver = neo4j.driver(DB.URL, neo4j.auth.basic(DB.USER, DB.PASSWORD))
        const session = driver.session()
        try {
            return await session.run(command, params)
        } finally {
            await session.close();
            await driver.close();
        }
    }
}
