import mongoose, { Schema } from 'mongoose'

const eventSchema = new Schema({
  title: {
    type: String
  },
  eventDate: {
    type: Date
  },
  description: {
    type: String
  },
  registrationStartDate: {
    type: Date
  },
  registrationEndDate: {
    type: Date
  },
  registerUsers: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }],
  organizer: {
    type: String
  },
  more: {
    type: String
  },
  location: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

eventSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      eventDate: this.eventDate,
      description: this.description,
      registrationStartDate: this.registrationStartDate,
      registrationEndDate: this.registrationEndDate,
      registerUsers: this.registerUsers,
      organizer: this.organizer,
      more: this.more,
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

const model = mongoose.model('Event', eventSchema)

export const schema = model.schema
export default model
