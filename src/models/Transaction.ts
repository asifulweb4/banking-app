import mongoose, { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['deposit', 'withdraw'], required: true },
    date: { type: String, required: true },
});

export const Transaction = models.Transaction || model('Transaction', TransactionSchema);