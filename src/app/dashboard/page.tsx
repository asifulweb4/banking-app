"use client";
import { useState, useEffect } from 'react';
import Summary from '@/components/dashboard/summary';
import TransactionList from '@/components/dashboard/transaction-list';
import FinanceChart from '@/components/dashboard/finance-chart';
import CurrencyConverter from '@/components/dashboard/currency-converter';
import USAPayment from '@/components/dashboard/usa-payment';
import PaymentForm from '@/components/dashboard/payment-form';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function DashboardPage() {
    const [mounted, setMounted] = useState(false);
    const { fetchTransactions } = useFinanceStore();

    useEffect(() => {
        setMounted(true);
        fetchTransactions(); // Supabase থেকে সব ডাটা লোড হবে
    }, [fetchTransactions]);

    if (!mounted) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Finance Dashboard</h1>
                    <p className="text-gray-500 text-sm">Real-time overview of your finances</p>
                </div>
                {/* নানা-নানির জন্য স্পেশাল পেমেন্ট বাটন এখানেও রাখতে পারো */}
            </header>

            {/* Top Cards: Summary & Converter */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                    <Summary />
                </div>
                <div className="xl:col-span-1">
                    <CurrencyConverter />
                </div>
            </div>

            {/* USA Special Payment Section for Nana-Nani */}
            <div className="w-full">
                <USAPayment />
            </div>

            {/* Main Action Section: Form & List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* সাধারণ ডিপোজিট/উইথড্র ফর্ম */}
                    <PaymentForm />

                    {/* লেনদেনের তালিকা */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Transactions</h2>
                        <TransactionList />
                    </div>
                </div>

                {/* Sidebar Section: Chart */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Financial Overview</h2>
                            <FinanceChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}