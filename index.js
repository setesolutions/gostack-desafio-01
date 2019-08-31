// Instancy of express
const express = require('express');

// Define app using express
const app = express();

// Setting app to use json format on responses
app.use(express.json());

// Set the variable to count the number of requisitions
let numberOfRequests = 0;

// Global Middleware to count the requisitions
app.use((req, res, next) => {
  // Increment variable numberOfRequests
  numberOfRequests++;

  console.log(`Quantidade de Requisições : ${numberOfRequests}`);

  next()
})

// Local Middleware to validate if Project Id exists
function checkProjectId (req, res, next) {
  // Take the id variable of req.params
  const { id } = req.params;

  // Set project variable and locate for id repassed on id variable
  const project = projects.find(p => p.id === id);

  // Validate if variable project is not null
  if(!project) {
    return res.status(400).json( { error: 'Project Id not exists'})
  }

  return next();
}

// Set projects variable as an array
const projects = [];

// Route to show all the projects
app.get('/projects', (req, res) => {
  // Return the projects list
  return res.json(projects);
})

// Route to create an informed specific project by an user
app.post('/projects', (req, res) => {
  // Take the id and title variables of req.body
  const { id, title } = req.body;

  // Set the project variable to receive the data
  const project = {
    id,
    title,
    tasks: []
  };

  // Insert into the projects array the informated data
  projects.push(project);

  // Return the projects list updated
  return res.json(projects);
})

// Route to update an informed specific project by an user
app.put('/projects/:id', checkProjectId, (req, res) => {
  // Take the id variable of req.params
  const { id } = req.params;
  // Take the title variable of req.body 
  const { title } = req.body;

  // Set project variable and locate for id repassed on id variable
  const project = projects.find(p => p.id === id);

  // Update the title field on variable project
  project.title = title;

  // Return the list of projects updated
  return res.json(projects);
})

// Route to delete an informed specific project by an user
app.delete('/projects/:id', checkProjectId, (req, res) => {
  // Take the id variable of req.params
  const { id } = req.params;
  // Set projectIndex variable and locate for id repassed on id variable bringing a index response of array
  const projectIndex = projects.findIndex(p => p.id === id);

  // Delete a specific index of array that corresponds for informed id
  projects.splice(projectIndex, 1);
  
  // Show the updated list of projects
  return res.json(projects);
})

// Route to create a task into a informed specific project by an user 
app.post('/projects/:id/tasks', checkProjectId, (req, res) => {
  // Take the id variable of req.params
  const { id } = req.params;
  // Take the task title variable of req.body
  const { title } = req.body;
  
  // Set the project variable and locate of id repassed on id variable
  const project = projects.find(p => p.id === id);

  // Update the project task with the data informed
  project.tasks.push(title);

  // Show the updated list of projects
  return res.json(projects);
})

// Listen the port 3000
app.listen(3000);