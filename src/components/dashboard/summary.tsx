"use client";
import { useFinanceStore } from '@/store/useFinanceStore';

export default function Summary() {
    const { transactions } = useFinanceStore();

    // Calculation logic
    const totalDeposit = transactions
        .filter(tx => tx.type === 'deposit')
        .reduce((acc, tx) => acc + tx.amount, 0);

    const totalWithdraw = transactions
        .filter(tx => tx.type === 'withdraw')
        .reduce((acc, tx) => acc + tx.amount, 0);

    const balance = totalDeposit - totalWithdraw;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500">Total Balance</p>
                <h3 className="text-2xl font-bold text-gray-900">৳{balance}</h3>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500">Total Deposit</p>
                <h3 className="text-2xl font-bold text-green-600">৳{totalDeposit}</h3>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500">Total Withdraw</p>
                <h3 className="text-2xl font-bold text-red-600">৳{totalWithdraw}</h3>
            </div>
        </div>
    );
}