"use client";
import { CreditCard, Globe } from 'lucide-react';

export default function USAPayment() {
    const handlePay = () => {
        // এখানে তোমার Stripe এর Payment Link টি বসবে
        window.open("https://buy.stripe.com/test_nana_nani_link", "_blank");
    };

    return (
        <div className="bg-linear-to-r from-green-500 to-teal-600 p-6 rounded-2xl text-white shadow-xl mt-6">
            <div className="flex items-center gap-3 mb-4">
                <Globe size={24} />
                <h3 className="text-lg font-bold">International Deposit (USA)</h3>
            </div>
            <p className="text-sm opacity-90 mb-6">
                নানা-নানি, এখান থেকে আপনারা সরাসরি কার্ড দিয়ে টাকা পাঠাতে পারবেন। এটি সম্পূর্ণ নিরাপদ।
            </p>
            <button
                onClick={handlePay}
                className="w-full bg-white text-teal-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all"
            >
                <CreditCard size={20} />
                Pay with Credit/Debit Card
            </button>
        </div>
    );
}