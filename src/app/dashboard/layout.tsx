import Sidebar from '@/components/shared/sidebar';
import Navbar from '@/components/shared/navbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="md:ml-64 transition-all duration-300">
                <Navbar />
                <main className="p-6 md:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}