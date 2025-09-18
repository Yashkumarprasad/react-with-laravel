import React, { useState } from 'react';
import AdminLayout from '../Shared/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function UsersIndex({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [clientErrors, setClientErrors] = useState({});

    function validate() {
        const errs = {};

        if (!data.name.trim()) {
            errs.name = "Name is required.";
        }

        if (!data.email.trim()) {
            errs.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errs.email = "Invalid email format.";
        }

        if (!data.password.trim()) {
            errs.password = "Password is required.";
        }

        if (!data.password_confirmation.trim()) {
            errs.password_confirmation = "Confirm Password is required.";
        }

        if (data.password !== data.password_confirmation) {
            errs.password_confirmation = "Passwords do not match.";
        }

        return errs;
    }

    function submit(e) {
        e.preventDefault();
        const errs = validate();

        if (Object.keys(errs).length > 0) {
            setClientErrors(errs);
            return;
        }

        setClientErrors({});
        post(route('admin.users.store'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <AdminLayout auth={auth} title="Add User">
            <div className="bg-white rounded shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add User</h2>
                    <Link
                        href={route('admin.users.index')}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                        Back
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {clientErrors.name && <div className="text-red-600">{clientErrors.name}</div>}
                        {errors.name && (
                            <div className="text-red-600 text-sm">{errors.name}</div>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {clientErrors.email && <div className="text-red-600">{clientErrors.email}</div>}
                        {errors.email && (
                            <div className="text-red-600 text-sm">{errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {clientErrors.password && (
                            <div className="text-red-600">{clientErrors.password}</div>
                        )}
                        {errors.password && (
                            <div className="text-red-600 text-sm">{errors.password}</div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-1 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="w-full p-2 border rounded"
                        />
                        {clientErrors.password_confirmation && (
                            <div className="text-red-600">{clientErrors.password_confirmation}</div>
                        )}
                        {errors.password_confirmation && (
                            <div className="text-red-600 text-sm">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            {processing ? 'Saving...' : 'Save User'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}