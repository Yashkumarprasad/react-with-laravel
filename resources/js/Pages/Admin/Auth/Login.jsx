import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
        _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.login.post'));
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Head title={"Admin Login"} />
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

                <form onSubmit={submit}>
                    <label className="block mb-2">Email</label>
                    <input
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        type="email"
                        className="w-full p-2 border rounded mb-2"
                    />
                    {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}

                    <label className="block mt-4 mb-2">Password</label>
                    <input
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        type="password"
                        className="w-full p-2 border rounded mb-2"
                    />
                    {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}

                    <div className="flex items-center mt-4">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={data.remember}
                            onChange={e => setData('remember', e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="remember">Remember me</label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-6 w-full p-2 bg-blue-600 text-white rounded"
                    >
                        {processing ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
