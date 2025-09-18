import React from 'react';
import AdminLayout from '../Shared/AdminLayout';
import { Link } from '@inertiajs/react';

export default function SubAdminsIndex({ auth, subadmins }) {
    return (
        <AdminLayout auth={auth} title="Sub Admin Manager">
            <div className="bg-white rounded shadow p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Sub Admins</h2>
                    <Link href={route('admin.sub-admins.create')} className="px-3 py-1 bg-blue-600 text-white rounded">Create</Link>
                </div>

                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left">
                            <th className="p-2">ID</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subadmins.map(u => (
                            <tr key={u.id} className="border-t">
                                <td className="p-2">{u.id}</td>
                                <td className="p-2">{u.name}</td>
                                <td className="p-2">{u.email}</td>
                                <td className="p-2">
                                    <Link href={route('admin.sub-admins.edit', u.id)} className="mr-2 text-blue-600">Edit</Link>
                                    <form method="post" action={route('admin.sub-admins.destroy', u.id)} className="inline">
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button type="submit" className="text-red-600">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex space-x-2 mt-4">
                    {subadmins.links.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.url}
                            className={`px-3 py-1 border ${link.active ? 'bg-blue-500 text-white' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}