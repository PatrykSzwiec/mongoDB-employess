const express = require('express');
const cors = require('cors');
const app = express();
const mongoClient = require('mongodb').MongoClient;

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err){
    console.log(err);
  }
  else {
    console.log('Successfully connected to the database');

    const db = client.db('companyDB');
    const app = express();

    /* Find and convert data to array 
    db.collection('employees').find({ department: 'IT' }).toArray((err, data) => {
      if(!err) {
        console.log(data)
      }
    }); */

    /* Find one element 
    db.collection('employees').findOne({ department: 'IT' }, (err, data) => {
      if(!err) {
        console.log(data)
      }
    }); */

    /* Add new element to db
    db.collection('departments').insertOne({ name: 'Management' }, err => {
      if(err) console.log('err');
    }); */

    /* Edit existing db element
    db.collection('employees').updateOne({ department: 'IT' }, { $set: { salary: 6000 }}, err => {
      if(err) console.log(err);
    }); */

    /* Delete element from db
    db.collection('departments').deleteOne({ name: 'Management' }, (err) => {
      if(err) console.log(err);
    }); */

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use('/api', employeesRoutes);
    app.use('/api', departmentsRoutes);
    app.use('/api', productsRoutes);

    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    })

    app.listen('8000', () => {
      console.log('Server is running on port: 8000');
    });

  }
});
