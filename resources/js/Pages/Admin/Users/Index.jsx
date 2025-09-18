import React, { useEffect } from 'react';
import AdminLayout from '../Shared/AdminLayout';
import { Link } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { Edit, Trash2 } from 'lucide-react';

export default function UsersIndex({ auth, users, flash }) {
    // Show Laravel flash messages as Toasts
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AdminLayout auth={auth} title="User Manager">
            <div className="bg-white rounded shadow p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Users</h2>
                    <Link
                        href={route('admin.users.create')}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                        Create
                    </Link>
                </div>

                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left">
                            <th className="p-2">S.No.</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((u, index) => (
                            <tr key={u.id} className="border-t">
                                <td className="p-2">
                                    {(users.current_page - 1) * users.per_page + (index + 1)}
                                </td>
                                <td className="p-2">{u.name}</td>
                                <td className="p-2">{u.email}</td>
                                <td className="p-2">
                                    <Link
                                        href={route('admin.users.edit', u.id)}
                                        className="btn btn-primary mr-2"
                                    >
                                        <Edit className="w-4 h-4 mr-1" />
                                        Edit
                                    </Link>

                                    <form
                                        method="post"
                                        action={route('admin.users.destroy', u.id)}
                                        className="inline"
                                    >
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <input
                                            type="hidden"
                                            name="_token"
                                            value={document
                                                .querySelector('meta[name="csrf-token"]')
                                                .getAttribute('content')}
                                        />
                                        <button type="submit" className="btn btn-danger">
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex space-x-2 mt-4">
                    {users.links.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.url || '#'}
                            className={`px-3 py-1 border ${link.active ? 'bg-blue-500 text-white' : ''
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}