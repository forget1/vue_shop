const mongoose = require('mongoose')
const bcrybt = require('bcrypt')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let SALT_WORK_FACTOR = 10

const userSchema = new Schema({
  UserId: ObjectId,
  userName: {
    unique: true,
    type: String
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'user'
})

userSchema.pre('save', function (next) {
  console.log(this)
  bcrybt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrybt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      this.password = hash
      next()
    })
  })
})

mongoose.model('User', userSchema)