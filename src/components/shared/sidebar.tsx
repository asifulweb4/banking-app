"use client";
import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft, Settings, Menu, X } from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Wallet, label: 'My Wallet', href: '/wallet' },
    { icon: ArrowUpRight, label: 'Deposits', href: '/deposits' },
    { icon: ArrowDownLeft, label: 'Withdrawals', href: '/withdrawals' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* মোবাইল মেনু বাটন - এটি শুধুমাত্র মোবাইলে দেখা যাবে */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-indigo-600 text-white rounded-lg shadow-lg active:scale-95 transition-transform"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* সাইডবার লজিক */}
            <aside className={`
                w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-40
                flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0
            `}>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-indigo-600 italic">GeminiBank</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsOpen(false)} // লিঙ্ক ক্লিক করলে মেনু বন্ধ হয়ে যাবে
                            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition"
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* ব্যাকড্রপ (মোবাইলে মেনু খুললে বাইরের অংশ ঝাপসা করার জন্য) */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
                />
            )}
        </>
    );
}