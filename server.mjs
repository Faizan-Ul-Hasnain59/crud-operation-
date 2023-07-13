import express from 'express';
const app = express()git pu
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello world! by Faizan');
})

app.get('/name', (req, res) => {
    res.send('Hello world by ${name}');
  })

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})