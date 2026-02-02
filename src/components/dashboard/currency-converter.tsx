"use client";
import { useState } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function CurrencyConverter() {
    const [usd, setUsd] = useState(1);
    const rate = 121.50; // বর্তমানে ১ ডলার = ১২১.৫০ টাকা (ধরে নিলাম)

    return (
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg italic">USD to BDT Converter</h3>
                <RefreshCcw size={18} className="opacity-70 cursor-pointer hover:rotate-180 transition-all duration-500" />
            </div>
            <div className="space-y-4">
                <div>
                    <label className="text-xs opacity-80 uppercase tracking-wider">Amount (USD)</label>
                    <input
                        type="number"
                        value={usd}
                        onChange={(e) => setUsd(Number(e.target.value))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 ring-white/30 text-xl font-bold"
                    />
                </div>
                <div className="pt-2 border-t border-white/10">
                    <p className="text-xs opacity-80 uppercase tracking-wider">Estimated BDT</p>
                    <p className="text-3xl font-black">৳ {(usd * rate).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}