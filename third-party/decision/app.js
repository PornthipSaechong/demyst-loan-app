const express = require('express')
const app = express()
const port = 5003

app.use(express.json())

app.post('/approve', (req, res) => {
  const { year, businessName, profitOrLoss, preAssessment } = req.body
  // logic to approve or reject, this is an assumption
  console.log('assessing', year, businessName, profitOrLoss, preAssessment)
  let valid = false
  if (preAssessment > 50) {
    valid = true
  }

  res.send(res.status(200).json({ approved: valid, approvalRate: preAssessment }))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
