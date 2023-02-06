const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        members: {
            type: Array,
            required: true,
        },
        captain: {
            type: String,
            required: true,
        },
        league: {
            type: String,
            required: true,
        },
        division: {
            type: String,
            required: true,
        },
        matches: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);