"use client";
import { useFinanceStore } from '@/store/useFinanceStore';
import { formatCurrency } from '@/lib/utils';
import { PlusCircle, Coins, Trash2, Edit2, Check, X, ArrowUpRight, ArrowDownLeft, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function MasterTransactionPage() {
    const { transactions, addTransaction, deleteTransaction, updateTransaction } = useFinanceStore();

    // States for Form
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');

    // Edit states
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editAmount, setEditAmount] = useState('');

    const handleAdd = () => {
        if (!title || !amount) return;
        addTransaction({
            title,
            amount: type === 'withdraw' ? -Math.abs(Number(amount)) : Math.abs(Number(amount)), // টাইপ অনুযায়ী মাইনাস বা প্লাস নিশ্চিত করা হয়েছে
            type: type,
            date: new Date().toISOString(),
        });
        setTitle('');
        setAmount('');
    };

    const startEdit = (transaction: any) => {
        setEditingId(transaction.id);
        setEditTitle(transaction.title);
        setEditAmount(Math.abs(transaction.amount).toString());
    };

    const saveEdit = (id: string) => {
        updateTransaction(id, {
            title: editTitle,
            amount: type === 'withdraw' ? -Math.abs(Number(editAmount)) : Math.abs(Number(editAmount))
        });
        setEditingId(null);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 p-4">
            <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors w-fit font-medium"
            >
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Transaction Manager</h1>
                <p className="text-gray-500 font-medium">Add or manage your deposits and withdrawals from one place.</p>
            </div>

            <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-wider text-sm">
                        <PlusCircle size={18} />
                        <span>Record Activity</span>
                    </div>

                    <div className="flex bg-gray-100 p-1 rounded-2xl w-full md:w-auto">
                        <button
                            onClick={() => setType('deposit')}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${type === 'deposit' ? 'bg-green-500 text-white shadow-md' : 'text-gray-500'}`}
                        >
                            <ArrowUpRight size={18} /> Deposit
                        </button>
                        <button
                            onClick={() => setType('withdraw')}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${type === 'withdraw' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500'}`}
                        >
                            <ArrowDownLeft size={18} /> Withdraw
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                    <div className="md:col-span-6 space-y-2">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-lg text-black"
                            placeholder={type === 'deposit' ? "e.g. Freelance Income" : "e.g. Grocery Shopping"}
                        />
                    </div>

                    <div className="md:col-span-4 space-y-2">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Amount ($)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-lg text-black"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            onClick={handleAdd}
                            className={`w-full p-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${type === 'deposit' ? 'bg-green-600 hover:bg-green-700 shadow-green-100' : 'bg-red-600 hover:bg-red-700 shadow-red-100'}`}
                        >
                            Add {type === 'deposit' ? 'Deposit' : 'Withdraw'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 ml-1">
                    <Coins size={20} className="text-gray-400" />
                    Recent Transactions
                </h3>

                <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 text-sm font-bold text-gray-500">DESCRIPTION</th>
                                <th className="p-6 text-sm font-bold text-gray-500">TYPE</th>
                                <th className="p-6 text-sm font-bold text-gray-500">AMOUNT</th>
                                <th className="p-6 text-sm font-bold text-gray-500 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transactions.map((t: any) => ( // এখানে 'any' টাইপ যোগ করা হয়েছে এরর ফিক্স করতে
                                <tr key={t.id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="p-6 font-bold text-gray-800">
                                        {editingId === t.id ? (
                                            <input
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full text-black"
                                            />
                                        ) : t.title}
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${t.type === 'deposit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className={`p-6 font-extrabold text-lg ${t.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                                        {editingId === t.id ? (
                                            <input
                                                type="number"
                                                value={editAmount}
                                                onChange={(e) => setEditAmount(e.target.value)}
                                                className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-24 text-black"
                                            />
                                        ) : (
                                            `${t.type === 'deposit' ? '+' : '-'} ${formatCurrency(Math.abs(t.amount))}`
                                        )}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            {editingId === t.id ? (
                                                <>
                                                    <button onClick={() => saveEdit(t.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                                        <Check size={20} />
                                                    </button>
                                                    <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
                                                        <X size={20} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEdit(t)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => deleteTransaction(t.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}