# Knowledge Graph: Setting Up and Running the Neo4j Database Connection

## Introduction
Generating a Knowledge Graph with Neo4j:
This utility translates a structured JSON file, detailing module dependencies, into a visual knowledge graph in Neo4j. Designed primarily for developers, this tool turns package dependency data into an intuitive graphical format, aiding in deeper insights and understanding.

## Prerequisites:
Before proceeding, make sure you have the following:

Node.js installed on your system.
An account with Neo4j, specifically for an AuraDB instance.

## Instructions:
### 1. Set up your database credentials:
- Create an account with Neo4j and set up an AuraDB instance.
- Once you have your AuraDB credentials, you will need to input these into the project for the connection to work.
- Navigate to the /Services/DB.js file in your project directory.
- Replace uri, username, and password with the respective details from your Neo4j AuraDB account.

### 2. Preparing your data:
- Identify the file you want to process and place it in the root directory of your project. This currently works with
- Open index.js and set the desired file path:

`const filePath = './your-file-path-here';`

- Replace your-file-path-here with the relative path to the file you want to process. There are sample JSON data files that are currently setup to work with this implementation.

### 3. Running the script:
- Open a terminal or command prompt in the project directory.

- Execute the following command:

`node ./index.js`

### 4. OUTPUT - Viewing the Results:
- Visit the Neo4j AuraDB console and navigate to the "Query" tab.
- On the left menu under the "Query" tab, click on the "DEPENDS_ON" option to filter and view these specific relationships.
- Then, you should be able to visualise the relationships and nodes that have been generated from your data. 

#### Important Notes:
- Please be aware that the Package.deleteAllNodesAndLinks() function at the start of index.js will clear the database every time you run the script. If you wish to retain existing nodes and links, consider commenting out or removing this function call.
- This setup does not include the management of sensitive database credentials through environment variables. 
- Always ensure that your credentials are securely stored and not hard-coded or publicly exposed.
- The GraphQLExperiment branch is experimental - can create nodes but unable to map relationships ( ignore this file ). 

### IFB398 Project Notes:
- This project experimentation was carried out in JavaScript coding language.
- Given the decision is to use python coding language for the project there are two options moving forward:
    1. Rewrite the code in python
    2. Package this code up into a library so that it can be easily utilised within the main python project

### Conclusion:
With these steps, you should now be able to process a file, run the Node.js script, and visualise the resulting data
in the Neo4j AuraDB console. If any issues arise, double-check your database credentials and ensure your Node.js environment is correctly set up.
