"use client";
import { useState } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { v4 as uuidv4 } from 'uuid';

export default function AddTransactionModal() {
    const addTransaction = useFinanceStore((state: { addTransaction: any; }) => state.addTransaction);
    const [formData, setFormData] = useState({ title: '', amount: '', type: 'deposit' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.amount) return;

        addTransaction({
            id: uuidv4(),
            title: formData.title,
            amount: parseFloat(formData.amount),
            type: formData.type as 'deposit' | 'withdraw',
            category: 'Finance',
            date: new Date().toLocaleDateString(),
        });
        setFormData({ title: '', amount: '', type: 'deposit' });
    };

    return (
        <div className="p-6 bg-white border rounded-2xl mb-6">
            <h3 className="text-lg font-bold mb-4">New Transaction</h3>
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    placeholder="Title"
                    className="flex-1 p-2 border rounded-lg"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <input
                    type="number" placeholder="Amount"
                    className="w-full md:w-32 p-2 border rounded-lg"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
                <select
                    className="p-2 border rounded-lg"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                    <option value="deposit">Deposit</option>
                    <option value="withdraw">Withdraw</option>
                </select>
                <button onClick={handleSubmit} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700">
                    Add
                </button>
            </div>
        </div>
    );
}