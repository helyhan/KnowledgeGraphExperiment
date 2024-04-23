import DB from "../Services/DB.js"
import { v4 as uuidv4 } from 'uuid';


// Each of the methods in Package class makes use of the DB.run method 
// from the DB class to execute our Neo4j Cypher commands.
export default class Package
{
    /**
     * Creates a new node in the database representing a package with the specified name.
     * @param {string} name - The name of the package node to create.
     * @returns {Promise<Object>} - A promise that resolves with the details of the created node.
    */
    static async createNode(name)
    {
        return DB.run(
            `CREATE (a:Package {name: $name}) RETURN a`, 
            { name: name }
        )
    }

    /**
     * Deletes all nodes labeled as 'Package' and their associated 'DEPENDS_ON' relationships from the database.
     * @returns {Promise<Object>} - A promise that resolves when the nodes and relationships are deleted.
    */
    static async deleteAllNodesAndLinks() {
        return DB.run(
            `
            MATCH (a:Package)-[r:DEPENDS_ON]-()  // Match any DEPENDS_ON relationships of Package nodes
            DELETE r, a                         // Delete those relationships and the nodes
        `
        );
    }

    /**
     * Creates a 'DEPENDS_ON' relationship between two existing package nodes identified by their names.
     * @param {string} parentName - The name of the parent package node.
     * @param {string} childName - The name of the child package node.
     * @returns {Promise<Object>} - A promise that resolves with the details of the linked nodes.
    */
    static async linkNodes(parentName, childName) {
        return DB.run(
            `
            MATCH (parent:Package), (child:Package)
            WHERE parent.name = $parentName AND child.name = $childName
            MERGE (parent)-[:DEPENDS_ON]->(child)
            RETURN parent, child
        `,
            { parentName: parentName, childName: childName }
        );
    }

    /* FURTHER FUNCTIONALITY TO BE COMPLETED:
    - query to return all nodes 
    - query to return certain relationships attached to a node- i.e. in relationships, out relationships 
    - query a single node and return the properties of that node
    - assign properties to a node 
    */
}
