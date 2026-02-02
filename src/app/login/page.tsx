"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error) router.push('/dashboard');
        else alert(error.message);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to GeminiBank</h2>
                <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-4 text-black" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg mb-6 text-black" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">Login</button>
            </form>
        </div>
    );
}