import React from 'react';
import Sidebar from './Sidebar';
import { Head } from '@inertiajs/react';

export default function AdminLayout({ children, auth, title = 'Admin' }) {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <Head title={title} />
            <Sidebar user={auth.user} />

            <div className="flex-1 p-6">
                <header className="mb-6">
                    <h1 className="text-xl font-semibold">{title}</h1>
                </header>

                <main>{children}</main>
            </div>
        </div>
    );
}
