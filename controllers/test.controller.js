const TestModel = require('../models/test.model')

const addText = async (req, res, next) => {
    try {
      // grab details from the request
      const { text } = req.body

      // create text
      const newText = new TestModel({
        text,
      })
      // save to database
      const createdText = await newText.save()
      // return response
      return res.status(201).json({
        status: 'success',
        data: createdText,
      })
    } catch (err) {
      err.source = 'Creating a Text...'
      next(err)
    }
  }
  
  const getTexts = async (req, res, next) => {
    try {
      const texts = await TestModel
  
      return res.json({
        status: 'success',
        data: texts,
      })
    } catch (err) {
      err.source = 'Get Text Controller...'
      next(err)
    }
  }

module.exports = {
    addText,
    getTexts,
}