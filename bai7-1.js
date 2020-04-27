const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const shortid = require('shortid');
let port = 3000

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [{ "id": 1, "text": "blah" }] })
    .write()

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (request, response) => {
    response.send('I love CodersX');
});
app.get('/todos', (request, response) => {
    response.render('bai6-search', {
        todos: db.get('todos').value()
    });
});
app.get('/todos/search', (req, res) => {
    var q = req.query.q
    var matchedTodos = db.get('todos').value().filter(function (todo) {
        return todo.text.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('bai6-search', {
        todos: matchedTodos,
        query: q
    })
})
app.get('/todos/create', (req, res) => {
    res.render('bai6-create')
})
app.get('/todos/:id/delete', (req, res) => {
    let id = req.params.id
    db.get('todos').remove({ id: id }).write()
    res.redirect('back')
})
// app.post("/todos", (req, res) => {
//     let text = req.body.todo;
//     let id = shortid.generate()
//     let todo = {
//         id,
//         text
//     }
//     db.get('todos').push(todo).write()
//     res.redirect("back");
// });
app.post('/todos/create', (req, res) => {
    req.body.id = shortid.generate()
    db.get('todos').push(req.body).write() //Lưu thông tin người dùng gửi lên
    res.redirect('/todos') // Chuyển người dùng về trang users chứ k ở lại trang create nữa
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
