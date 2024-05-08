import mongoose from "mongoose"

// User Model
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)

// Consults Model
const consultsSchema = mongoose.Schema({
  userCpf: { type: Number, required: true },
  userName: { type: String, required: true },
  speciality: { type: String, required: true },
  profissional: { type: String, required: true },
  consultDate: { type: String, required: true },
  consultHour: { type: String, required: true }
})

const Consults = mongoose.model('Consults', consultsSchema)


// Schedule Model
const scheduleSchema = new mongoose.Schema({
  profissionalName: {type: String},
  hours: {type: Array},
  date: {type: Array}
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export { User, Consults, Schedule }