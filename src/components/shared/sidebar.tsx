"use client";
import Link from 'next/link';
import { LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft, Settings } from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Wallet, label: 'My Wallet', href: '/wallet' },
    { icon: ArrowUpRight, label: 'Deposits', href: '/deposits' },
    { icon: ArrowDownLeft, label: 'Withdrawals', href: '/withdrawals' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 hidden md:flex flex-col">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-indigo-600 italic">GeminiBank</h2>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition"
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}