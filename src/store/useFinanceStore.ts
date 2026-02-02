import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export const useFinanceStore = create<any>((set, get) => ({
    transactions: [],

    // ১. ব্যালেন্স ক্যালকুলেট করার ফাংশন (এটি যোগ করা হয়েছে এরর ফিক্স করতে)
    getBalance: () => {
        const { transactions } = get(); // বর্তমান ট্রানজেকশনগুলো নেওয়া হচ্ছে
        // সব অ্যামাউন্ট যোগ করা হচ্ছে (পজিটিভ জমা হবে, নেগেটিভ বিয়োগ হবে)
        return transactions.reduce((acc: number, tx: any) => acc + Number(tx.amount), 0);
    },

    fetchTransactions: async () => {
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) set({ transactions: data });
    },

    addTransaction: async (tx: any) => {
        // ডাটাবেস টেবিলের জন্য ক্লিন ডাটা
        const cleanData = {
            title: tx.title,
            amount: tx.amount,
            type: tx.type,
            date: tx.date || new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('transactions')
            .insert([cleanData])
            .select();

        if (error) {
            console.error("Supabase Error:", error.message);
            return;
        }

        if (data) {
            set((state: any) => ({ transactions: [data[0], ...state.transactions] }));
        }
    },

    deleteTransaction: async (id: string) => {
        const { error } = await supabase.from('transactions').delete().eq('id', id);
        if (!error) {
            set((state: any) => ({
                transactions: state.transactions.filter((t: any) => t.id !== id),
            }));
        }
    },

    updateTransaction: async (id: string, updatedData: any) => {
        const cleanUpdate = {
            title: updatedData.title,
            amount: updatedData.amount
        };

        const { error } = await supabase
            .from('transactions')
            .update(cleanUpdate)
            .eq('id', id);

        if (!error) {
            set((state: any) => ({
                transactions: state.transactions.map((t: any) =>
                    t.id === id ? { ...t, ...cleanUpdate } : t
                )
            }));
        }
    }
}));