"use client";
import { useFinanceStore } from '@/store/useFinanceStore';
import { User, Bell, Shield, Trash2, RefreshCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AddTransactionModal from '@/components/dashboard/add-transaction-modal';

export default function SettingsPage() {
    const { transactions } = useFinanceStore();

    const handleClearData = () => {
        if (confirm("Are you sure you want to delete all transaction data? This cannot be undone.")) {
            localStorage.removeItem('finance-storage');
            window.location.reload();
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            {/* Back to Dashboard Link */}
            <Link
                href="/dashboard"
                className="flex items-center gap-2 p-4 text-sm text-shadow-black hover:text-indigo-600 transition-colors w-fit"
            >
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <h1 className="text-2xl font-bold">Settings</h1>

            <div className="bg-white rounded-2xl border border-gray-100 divide-y">
                {/* Profile Section */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="font-bold">Display Name</p>
                            <p className="text-sm text-gray-500">Asiful Islam</p>
                        </div>
                    </div>
                    <button className="text-indigo-600 text-sm font-semibold hover:underline">Edit</button>
                </div>

                {/* Preferences */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-full text-gray-600">
                            <Bell size={24} />
                        </div>
                        <div>
                            <p className="font-bold">Notifications</p>
                            <p className="text-sm text-gray-500">Receive alerts on large withdrawals</p>
                        </div>
                    </div>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                </div>

                {/* Security */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-full text-gray-600">
                            <Shield size={24} />
                        </div>
                        <div>
                            <p className="font-bold">Security</p>
                            <p className="text-sm text-gray-500">Enable Two-Factor Authentication</p>
                        </div>
                    </div>
                    <button className="text-gray-400 text-sm font-semibold">Set Up</button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="p-6 bg-red-50 rounded-2xl border border-red-100 mt-8">
                <h3 className="text-red-700 font-bold mb-2 flex items-center gap-2">
                    <Trash2 size={18} /> Danger Zone
                </h3>
                <p className="text-red-600 text-sm mb-4">Once you delete your data, it's gone forever. Please be certain.</p>
                <button
                    onClick={handleClearData}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                    Reset All Account Data
                </button>
            </div>
        </div>
    );
}