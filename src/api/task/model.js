import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  acts: [{
    type: Schema.Types.ObjectId,
    ref : "Act"
  }],
  done: {
    type: Boolean,
    default : false
  },
  location: {
    type: Schema.Types.ObjectId,
    ref : "Location"
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

taskSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      title: this.title,
      acts: this.acts,
      done: this.done,
      location: this.location,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Task', taskSchema)

export const schema = model.schema
export default model
