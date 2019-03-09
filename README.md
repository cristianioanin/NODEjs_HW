# NODEjs_HW
**Informal School of IT - Node.js Project (Express.js)**

A sequel of the Students vs Teachers Project

Data is stored in a MySQL database, having 3 main tables: 
  students
  teachers
  grades (a simple, one-to-one relationship to students table)
  
The website is server-side rendered, using [Express.js](https://expressjs.com/) framework on the backend, with [EJS](https://ejs.co/) (EmbeddedJS) templating.
Routes are implemented via ExpressRouter.
The codebase uses ES6 modules, and while the import syntax isn't available yet in Node.js environment, this feature can be used with the help of Babel:

```javascript
// ./start.js file, example is assuming server.js to be the entry point for the app

require('babel-register')({
  presets: ['env']
})

module.exports = require('./server.js')
```

ES6 Classes encapsulate the logic for all queries needed for resource-fetching. Node.js uses the mysql module to execute the queries. For other AJAX calls, I used the axios module.
Landing page show a preview of REST API methods available. HTTP methods were implemented in the HTML template using PUT, DELETE, inclusively, with the aid of the npm method-override module.

![Landing Page](/screenshots/2019-03-09%20(17).png)

Returned data:

![Returned JSON list](/screenshots/2019-03-09%20(18).png)

Main page exposes basic CRUD functionality:
  Create a new Student/Teacher
  Read entities
  Update existing entities
  Destroy records
  
![Main Page](/screenshots/2019-03-09%20(19).png)

The forms for adding new and editing an existing resource are very similar. It would've been a great use-case for a component-driven pattern, like in an Ember/Angular framework/
I'm sorry to dissapoint, but this is not the case, since a dedicated template was implemented for every form state. The screenshots below depict the forms side-by-side.

![add/edit student](/screenshots/2019-03-09%20(22).png)
![add/edit teacher](/screenshots/2019-03-09%20(24).png)


