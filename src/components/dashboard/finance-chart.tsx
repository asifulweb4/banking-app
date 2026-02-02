"use client";
import { useFinanceStore } from '@/store/useFinanceStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function FinanceChart() {
    const { transactions } = useFinanceStore();

    // Data calculation
    const income = transactions
        .filter((t: { type: string; }) => t.type === 'deposit')
        .reduce((acc: any, t: { amount: any; }) => acc + t.amount, 0);

    const expense = transactions
        .filter((t: { type: string; }) => t.type === 'withdraw')
        .reduce((acc: any, t: { amount: any; }) => acc + t.amount, 0);

    const data = [
        { name: 'Income', value: income || 0 },
        { name: 'Expense', value: expense || 0 },
    ];

    const COLORS = ['#6366f1', '#f43f5e']; // Indigo for Income, Rose for Expense

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-87.5 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Financial Overview</h3>
            <p className="text-sm text-gray-500 mb-4">Income vs Expense ratio</p>

            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={8}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}