import DB from "../Services/DB.js"
import { v4 as uuidv4 } from 'uuid';


// Each of these methods in this class makes use of the DB.run method 
// from the DB class to execute our Neo4j Cypher commands.
export default class Package
{
    static async createNode(name)
    {
        return DB.run(
            `CREATE (a:Package {name: $name}) RETURN a`, 
            { name: name }
        )
    }

    static async deleteAllNodesAndLinks() {
        return DB.run(
            `
            MATCH (a:Package)-[r:DEPENDS_ON]-()  // Match any DEPENDS_ON relationships of Package nodes
            DELETE r, a                         // Delete those relationships and the nodes
        `
        );
    }

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