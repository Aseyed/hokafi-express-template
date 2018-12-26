import mongoose, { Schema } from 'mongoose'

const locationSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  tesks: [{
    type: Schema.Types.ObjectId,
    ref : "Task"
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

locationSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      name: this.name,
      lat: this.lat,
      lng: this.lng,
      tesks: this.tesks,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Location', locationSchema)

export const schema = model.schema
export default model
