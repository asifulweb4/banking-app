"use client";
import { useState } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Smartphone, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export default function PaymentForm() {
    const [amount, setAmount] = useState(0);
    const [txnID, setTxnID] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // 'number' এর বদলে 'phoneNumber' ব্যবহার করা হয়েছে
    const { addTransaction } = useFinanceStore();

    // বিকাশ ডিপোজিট ফাংশন
    const handleRealDeposit = () => {
        if (amount <= 0) return alert("দয়া করে সঠিক অ্যামাউন্ট দিন!");
        if (txnID.length < 5) return alert("সঠিক Transaction ID দিন!");

        addTransaction({
            title: `bKash Deposit (Txn: ${txnID})`,
            amount: amount, // পজিটিভ ভ্যালু ব্যালেন্স বাড়াবে
            type: 'deposit'
        });

        alert(`৳${amount} জমার রিকোয়েস্ট সফল হয়েছে!`);
    };

    // উইথড্র ফাংশন
    const handleWithdraw = (method: string) => {
        if (amount <= 0) return alert("সঠিক অ্যামাউন্ট দিন!");
        if (!phoneNumber || phoneNumber.length < 11) return alert("সঠিক মোবাইল নম্বর দিন!");

        // নিশ্চিত করো যে amount টি বিয়োগ হচ্ছে
        addTransaction({
            title: `${method} Withdraw to ${phoneNumber}`,
            amount: -Math.abs(amount), // Math.abs নিশ্চিত করবে যে সংখ্যাটি পজিটিভ, তারপর সেটি মাইনাস হবে
            type: 'withdraw'
        });

        alert(`৳${amount} উইথড্র সফল!`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* --- DEPOSIT SECTION --- */}
            <div className="bg-white p-6 rounded-2xl border shadow-lg border-t-4 border-t-pink-600">
                <h3 className="font-bold text-pink-600 mb-4 flex items-center gap-2">
                    <ArrowDownCircle /> Real bKash Deposit
                </h3>
                <div className="space-y-4">
                    <div className="p-3 bg-pink-50 rounded-lg border border-pink-100">
                        <p className="text-xs text-pink-700">বিকাশ পার্সোনাল নম্বরে সেন্ড মানি করুন:</p>
                        <p className="text-xl font-bold text-pink-600">01XXXXXXXXX</p>
                    </div>
                    <input
                        type="number"
                        placeholder="কত টাকা পাঠিয়েছেন?"
                        className="w-full p-2 border rounded text-black font-semibold"
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <input
                        type="text"
                        placeholder="Transaction ID (TxnID)"
                        className="w-full p-2 border rounded text-black uppercase"
                        onChange={(e) => setTxnID(e.target.value)}
                    />
                    <button
                        onClick={handleRealDeposit}
                        className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition"
                    >
                        Confirm Deposit
                    </button>
                </div>
            </div>

            {/* --- WITHDRAW SECTION --- */}
            <div className="bg-white p-6 rounded-2xl border shadow-lg border-t-4 border-t-orange-500">
                <h3 className="font-bold text-orange-600 mb-4 flex items-center gap-2">
                    <ArrowUpCircle /> Withdraw (বিকাশ/নগদ)
                </h3>
                <div className="space-y-4">
                    <input
                        type="number"
                        placeholder="কত টাকা তুলতে চান?"
                        className="w-full p-2 border rounded text-black font-semibold"
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <input
                        type="text"
                        placeholder="বিকাশ/নগদ মোবাইল নম্বর"
                        className="w-full p-2 border rounded text-black"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleWithdraw('bKash')}
                            className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition"
                        >
                            bKash
                        </button>
                        <button
                            onClick={() => handleWithdraw('Nagad')}
                            className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition"
                        >
                            Nagad
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}