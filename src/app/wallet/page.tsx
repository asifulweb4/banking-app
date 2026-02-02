"use client";
import { useFinanceStore } from '@/store/useFinanceStore';
import { formatCurrency } from '@/lib/utils';
import { Wallet, ArrowUpRight, ArrowDownLeft, Landmark, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WalletPage() {
    const { getBalance, transactions } = useFinanceStore();

    const totalIncome = transactions
        .filter(t => t.type === 'deposit')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'withdraw')
        .reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="space-y-8">
            {/* Back to Dashboard Link */}
            <Link
                href="/dashboard"
                className="flex items-center gap-2 p-4 text-sm text-shadow-black hover:text-indigo-600 transition-colors w-fit"
            >
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <div>
                <h1 className="text-3xl font-bold text-gray-900 p-2 mb-4">My Wallet</h1>
                <p className="text-gray-500 p-2 mt-4">Manage your virtual assets and savings</p>
            </div>

            {/* Main Card */}
            <div className="bg-linear-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <Landmark className="absolute -right-5 -bottom-5 opacity-10" size={200} />
                <p className="text-indigo-100 mb-2 uppercase tracking-wider text-sm font-semibold">Current Balance</p>
                <h2 className="text-5xl font-bold mb-8">{formatCurrency(getBalance())}</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <p className="text-xs text-indigo-100 mb-1">Total Received</p>
                        <p className="text-xl font-bold">+{formatCurrency(totalIncome)}</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <p className="text-xs text-indigo-100 mb-1">Total Spent</p>
                        <p className="text-xl font-bold">-{formatCurrency(totalExpense)}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold mb-4">Quick Actions</h3>
                <div className="flex gap-4">
                    <Link href="/dashboard" className="flex-1 bg-gray-50 hover:bg-indigo-50 p-4 rounded-xl text-center transition group">
                        <p className="text-indigo-600 font-semibold group-hover:scale-110 transition">Add Cash</p>
                    </Link>
                    <Link href="/withdrawals" className="flex-1 bg-gray-50 hover:bg-red-50 p-4 rounded-xl text-center transition group">
                        <p className="text-red-600 font-semibold group-hover:scale-110 transition">Send Money</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}