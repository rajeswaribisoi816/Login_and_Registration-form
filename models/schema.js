const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    password2: {
        type: String,
        require: true,
    }
})
const Registers = mongoose.model("Rest", employeeSchema);
module.exports = Registers;