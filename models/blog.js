const mongoose  = require('mongoose')

const blogSchema = mongoose.Schema({
  title:String,
  author:String,
  url:String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
blogSchema.set('toJSON', {
  transform: (_document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned._v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog