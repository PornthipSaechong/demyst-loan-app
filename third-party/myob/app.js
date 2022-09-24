const express = require('express')
const app = express()
const port = 5002
const data = require('./data.json')

app.get('/myob/balanceSheet', (req, res) => {
  const { businessName, year } = req.query
  let filteredData = data[businessName]
  if (!filteredData) {
    res.status(401).send()
  }
  filteredData = filteredData.filter(a => a.year === parseInt(year))
  res.send(filteredData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
