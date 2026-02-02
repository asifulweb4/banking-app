export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: 'deposit' | 'withdraw';
    category: string;
    date: string;
}

export interface FinanceStore {
    transactions: Transaction[];
    addTransaction: (t: Transaction) => void;
    deleteTransaction: (id: string) => void;
    updateTransaction: (id: string, updated: Partial<Transaction>) => void;
    getBalance: () => number;
}