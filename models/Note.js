// Require mongoose
var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var NoteSchema = new Schema({
    // Just a string
    body: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

NoteSchema.plugin(uniqueValidator);
// Create the Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;