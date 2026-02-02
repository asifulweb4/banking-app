export default function Navbar() {
    return (
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
            <div className="text-sm text-gray-500">Welcome back, <span className="font-bold text-gray-800">User!</span></div>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                    JD
                </div>
            </div>
        </header>
    );
}