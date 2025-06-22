import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
});

const Student = mongoose.model('Student', studentSchema );

export default Student;
