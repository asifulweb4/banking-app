"use client";
import { useFinanceStore } from '@/store/useFinanceStore';
import { formatCurrency } from '@/lib/utils';
import { ArrowDownLeft, ArrowLeft, Receipt, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function WithdrawalsPage() {
    const { transactions } = useFinanceStore();
    const [mounted, setMounted] = useState(false);

    // Hydration error prevent korar jonno
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const withdrawals = transactions.filter(t => t.type === 'withdraw');

    return (
        <div className="max-w-5xl mx-auto space-y-6 p-4">
            {/* Back to Dashboard Link */}
            <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors w-fit font-medium"
            >
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            {/* Header Section */}
            <div className="flex items-center gap-4">
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 shadow-sm">
                    <ArrowDownLeft size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Withdrawal History</h1>
                    <p className="text-gray-500 font-medium text-sm">See all your past expenses and outflows</p>
                </div>
            </div>

            {/* History Table Card */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-gray-50/50 overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center gap-2">
                    <Receipt size={18} className="text-gray-400" />
                    <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Expense Records</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="p-6 font-bold flex items-center gap-2">
                                    <Tag size={14} /> Destination
                                </th>
                                <th className="p-6 font-bold">
                                    <Calendar size={14} className="inline mr-2" /> Date
                                </th>
                                <th className="p-6 font-bold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {withdrawals.length > 0 ? (
                                withdrawals.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-6 font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                                            {t.title}
                                        </td>
                                        <td className="p-6 text-gray-500 font-medium text-sm">
                                            {t.date}
                                        </td>
                                        <td className="p-6 text-right font-extrabold text-red-600 text-lg">
                                            - {formatCurrency(t.amount)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="p-20 text-center">
                                        <p className="text-gray-400 font-medium italic">No withdrawals history found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}