import neo4j from 'neo4j-driver';
export default class DB
{
    static URL = 'XXX'
    static USER = 'XXX'
    static PASSWORD = 'XXX'

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