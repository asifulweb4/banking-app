"use client";
import { useFinanceStore } from '@/store/useFinanceStore';
import { Trash2, Edit3, Check, X } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

export default function TransactionList() {
    const { transactions, deleteTransaction, updateTransaction } = useFinanceStore();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState({ title: '', amount: 0 });

    const startEdit = (t: any) => {
        setEditingId(t.id); // Supabase এ শুধু 'id' থাকে, '_id' নয়
        setEditData({ title: t.title, amount: t.amount });
    };

    const saveEdit = (id: string) => {
        updateTransaction(id, editData);
        setEditingId(null);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-500 text-sm uppercase">
                    <tr>
                        <th className="p-4 font-semibold">Title</th>
                        <th className="p-4 font-semibold">Amount</th>
                        <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {transactions.map((t: any) => (
                        // এখানে key={t.id} ব্যবহারের ফলে ইউনিক কি এরর চলে যাবে
                        <tr key={t.id} className="hover:bg-gray-50/50 transition">
                            <td className="p-4">
                                {editingId === t.id ? (
                                    <input
                                        className="border rounded px-2 py-1 w-full text-black"
                                        value={editData.title}
                                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    />
                                ) : (
                                    <span className="font-medium text-gray-700">{t.title}</span>
                                )}
                            </td>
                            <td className="p-4">
                                {editingId === t.id ? (
                                    <input
                                        type="number"
                                        className="border rounded px-2 py-1 w-24 text-black"
                                        value={editData.amount}
                                        onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
                                    />
                                ) : (
                                    <span className={`font-bold ${t.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                                        {t.type === 'withdraw' ? '-' : '+'} {formatCurrency(t.amount)}
                                    </span>
                                )}
                            </td>
                            <td className="p-4 text-right">
                                {editingId === t.id ? (
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => saveEdit(t.id)} className="text-green-600 p-1 hover:bg-green-50 rounded"><Check size={20} /></button>
                                        <button onClick={() => setEditingId(null)} className="text-gray-400 p-1 hover:bg-gray-50 rounded"><X size={20} /></button>
                                    </div>
                                ) : (
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => startEdit(t)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg"><Edit3 size={18} /></button>
                                        <button onClick={() => deleteTransaction(t.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}