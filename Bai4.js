const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let port = 3000
let todos = [
    { id: 1, name: 'Đi chợ' },
    { id: 2, name: 'Rửa chén' },
    { id: 3, name: 'Nấu cơm' },
    { id: 4, name: 'Học code tại CodersX' },
    { id: 5, name: 'Làm bài tập' }
]

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (request, response) => {
    response.send('I love CodersX');
});
app.get('/todos', (request, response) => {
    response.render('bai3-2', {
        todos: todos
    });
});
app.get('/todos/search', (req, res) => {
    var q = req.query.q
    var matchedTodos = todos.filter(function (todo) {
        return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('bai3-2', {
        todos: matchedTodos,
        query: q
    })
})
app.get('/todos/create', (req, res) => {
    res.render('bai4')
})
app.post('/todos/create', (req, res) => {
    todos.push(req.body) //Lưu thông tin người dùng gửi lên
    res.redirect('/todos') // Chuyển người dùng về trang users chứ k ở lại trang create nữa
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
