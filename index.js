const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let array = [];

let answer = {
    message: '',
    array: []
}

app.post('/save', (req, res) => {
    if(!req.body.element){
        res.send("You should provide at least an element");
    } else {
        array.push(req.body.element);
        answer.message = "Your element has been saved succesfully";
        answer.array = array;
        res.send(answer);
    }
});

app.get('/getLast/:elements', (req, res) => {
    if(!req.params.elements){
        res.send("You should provide at least a number of elements to get");
    } 
    if(array.length == 0) {
        res.send("Your don't have elements to show");
    } else {
        let numOfElements = req.params.elements
        if(array.length < numOfElements) {
            res.send("The number of elements exceed the quantity of current elements");
        } else {
            let newArr = [];
            for(let i = array.length - numOfElements; i < array.length; i++) {
                newArr.push(array[i]);
            }
            answer.message = `Your latest ${numOfElements} added elements are listed below`;
            answer.array = newArr;
            res.send(answer);
        }
    }
});

app.use(function(req, res, next) {
    res.status(404).send("Method not found");
});

app.listen(9001, () => {
    console.log("The app has started in port 9001");
})