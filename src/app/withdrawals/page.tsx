"use client";
import { useFinanceStore } from '@/store/useFinanceStore';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, ArrowDownCircle, Clock, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WithdrawalsPage() {
    const { transactions, deleteTransaction } = useFinanceStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // এখানে (t: any) যোগ করে এরর ফিক্স করা হয়েছে
    const withdrawals = transactions.filter((t: any) => t.type === 'withdraw');

    return (
        <div className="max-w-5xl mx-auto space-y-8 p-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors w-fit font-medium">
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Withdrawal History</h1>
                <p className="text-gray-500 font-medium">Track and manage all your outgoing transactions.</p>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {withdrawals.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-gray-400 font-medium">No withdrawal records found</td>
                            </tr>
                        ) : (
                            withdrawals.map((t: any) => (
                                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-red-50 text-red-600 rounded-xl"><ArrowDownCircle size={18} /></div>
                                            <span className="font-bold text-gray-800">{t.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-gray-500 font-medium">
                                        <div className="flex items-center gap-2"><Clock size={14} /> {t.date}</div>
                                    </td>
                                    <td className="p-6 text-right font-extrabold text-red-600 text-lg">
                                        - {formatCurrency(Math.abs(t.amount))}
                                    </td>
                                    <td className="p-6 text-right">
                                        <button onClick={() => deleteTransaction(t.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}