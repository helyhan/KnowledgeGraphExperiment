import Package from "./Models/Package.js"
import File from "./Services/File.js"


// Clear previous nodes and relationships - using for testing
await Package.deleteAllNodesAndLinks()

// Recursively create package nodes
async function processPackage(parentName, dependencies) {
    for (let dependency of dependencies) { // loop through dependencies
        let nodeName = `${dependency.name} ${dependency.version}`; 
        await Package.createNode(nodeName); // create nodes
        await Package.linkNodes(parentName, nodeName); // create relationships

        // If current dependency has its own dependencies, 
        // recursively will call itself with the current dependency as the new "parent" 
        if (dependency.dependencies && dependency.dependencies.length > 0) {
            await processPackage(nodeName, dependency.dependencies);
        }
    } 
}

// Set the package file name
const file = 'goblin.json'  // have also tested -> hangar-matplotlib.json

// Read the package from the json file
const pack = await File.parse(file) // package is a reserved word, can't use

// Create a node for the main package i.e. goblin 
let mainNodeName = `${pack.name} ${pack.version}`;
await Package.createNode(mainNodeName);

// Recursively create the package dependencies (including all the nodes and links for all dependencies)
await processPackage(mainNodeName, pack.dependencies)


/* 
Extra notes about the processPackage function: 

-   This function takes the name of a parent package and its dependencies. For each dependency, it:
    Creates a node in the database for that dependency.
    Creates a link from the parent to the dependency.
    Recursively processes the dependencies of the current dependency.

The "if" control statement condition checks two things:
 - if the current dependency has a property called dependencies. As some dependencies don't have their own nested dependencies.
 - if the length of dependencies is greater than 0, the package has one or more dependencies. 
 
 */