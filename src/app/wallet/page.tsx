"use client";
import { useFinanceStore } from '@/store/useFinanceStore';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function WalletPage() {
    const { transactions } = useFinanceStore();

    // এখানে (t: any) যোগ করে টাইপ এরর ফিক্স করা হয়েছে
    const totalIncome = transactions
        .filter((t: any) => t.type === 'deposit')
        .reduce((acc: number, t: any) => acc + Math.abs(t.amount), 0);

    const totalExpense = transactions
        .filter((t: any) => t.type === 'withdraw')
        .reduce((acc: number, t: any) => acc + Math.abs(t.amount), 0);

    const balance = totalIncome - totalExpense;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors w-fit">
                <ArrowLeft size={20} /> Back to Dashboard
            </Link>

            <div className="bg-linear-to-br from-indigo-600 to-violet-700 rounded-4xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-indigo-100 font-medium mb-2">Total Balance</p>
                    <h1 className="text-5xl font-bold tracking-tight">{formatCurrency(balance)}</h1>
                </div>
                <Wallet className="absolute -right-5 -bottom-5 text-white/10 w-64 h-64 -rotate-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                            <TrendingUp size={24} />
                        </div>
                        <p className="text-gray-500 font-medium">Total Income</p>
                    </div>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                </div>

                <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                            <TrendingDown size={24} />
                        </div>
                        <p className="text-gray-500 font-medium">Total Expenses</p>
                    </div>
                    <p className="text-3xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
                </div>
            </div>
        </div>
    );
}