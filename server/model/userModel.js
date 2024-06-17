import mongoose from "mongoose";

const types = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  name: {
    type: types.String,
    required: true
  },
  email: {
    type: types.String,
    required: true
  },
  address: {
    type: types.String,
    required: true
  }
})

export default mongoose.model('users', userSchema)