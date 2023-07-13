import express from 'express'
const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World! by Faizan');
})

app.get('/name', (req, res) => {
  res.send('Hello World! by ${name}');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${PORT}`)
})