import React from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar({ user }) {
    return (
        <aside className="w-64 bg-white border-r min-h-screen p-4">
            <div className="mb-8">
                <h2 className="text-lg font-semibold">Admin Panel</h2>
                <p className="text-sm text-gray-500">{user?.name}</p>
            </div>

            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href={route('admin.dashboard')} className="block py-2">Dashboard</Link>
                    </li>

                    <li>
                        <Link href={route('admin.users.index')} className="block py-2">User Manager</Link>
                    </li>

                    {user?.role?.name === 'super_admin' && (
                        <li>
                            <Link href={route('admin.sub-admins.index')} className="block py-2">Sub Admins</Link>
                        </li>
                    )}

                    <li>
                        <Link href={route('admin.blogs.index')} className="block py-2">Blog Admin</Link>
                    </li>

                    <li>
                        <form method="post" action={route('admin.logout')}>
                            <input
                                type="hidden"
                                name="_token"
                                value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')}
                            />
                            <button type="submit" className="w-full text-left py-2">Logout</button>
                        </form>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
