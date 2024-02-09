const express = require('express');
const mongoose = require('mongoose');
const Person = require('./person-model');

// mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());
app.listen(3000, async () => {
    console.log('Server started');
    const mongodbUri = 'mongodb+srv://admin:admin1234@cluster0.uyhgcoc.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(mongodbUri)
        .then(console.log('Connected to MongoDB'));
})

app.get('/person', async (req, res) => {
    const person = await Person.find({});
    res.send(person);
})

app.get('person/:email', async (req, res) => {
    const person = await Person.findOne({ email: req.params.email });
    res.send(person);
})

app.post('/person', async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
})

app.put('/person/:email', async (req, res) => {
    const person = await Person.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body },
        { new: true }
    );
    res.send(person);
})

app.delete('/person/:email', async (req, res) => {
    await Person.deleteMany({ email: req.params.email });
    res.send({ success: true });
});