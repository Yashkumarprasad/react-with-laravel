import React from 'react';
import AdminLayout from './Shared/AdminLayout';

export default function Dashboard({ auth, stats }) {
    return (
        <AdminLayout auth={auth} title="Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded shadow">
                    <h3 className="text-sm text-gray-500">Total Users</h3>
                    <div className="text-2xl font-bold">{stats.users_count}</div>
                </div>

                <div className="p-4 bg-white rounded shadow">
                    <h3 className="text-sm text-gray-500">Blogs</h3>
                    <div className="text-2xl font-bold">{stats.blogs_count}</div>
                </div>

                <div className="p-4 bg-white rounded shadow">
                    <h3 className="text-sm text-gray-500">Sub Admins</h3>
                    <div className="text-2xl font-bold">{stats.subadmins_count}</div>
                </div>
            </div>
        </AdminLayout>
    );
}
