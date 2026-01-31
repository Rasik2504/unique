import { useState } from 'react';
import { dataAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const EmployeeDashboard = () => {
    const { user, logout } = useAuth();
    const [rows, setRows] = useState([
        { id: 1, productName: '', quantity: '', price: '', customerName: '', paymentMethod: 'Cash' }
    ]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const addRow = () => {
        setRows([...rows, {
            id: rows.length + 1,
            productName: '',
            quantity: '',
            price: '',
            customerName: '',
            paymentMethod: 'Cash'
        }]);
    };

    const removeRow = (id) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const updateRow = (id, field, value) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const handleSubmitAll = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Validate all rows
            const validRows = rows.filter(row =>
                row.productName && row.quantity && row.price && row.customerName
            );

            if (validRows.length === 0) {
                setMessage({ type: 'error', text: 'Please fill at least one complete row' });
                setLoading(false);
                return;
            }

            // Submit all valid rows
            const promises = validRows.map(row =>
                dataAPI.create({
                    productName: row.productName,
                    quantity: Number(row.quantity),
                    price: Number(row.price),
                    customerName: row.customerName,
                    paymentMethod: row.paymentMethod,
                    date: new Date()
                })
            );

            await Promise.all(promises);

            setMessage({
                type: 'success',
                text: `Successfully submitted ${validRows.length} ${validRows.length === 1 ? 'entry' : 'entries'}!`
            });

            // Reset form
            setRows([
                { id: 1, productName: '', quantity: '', price: '', customerName: '', paymentMethod: 'Cash' }
            ]);
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to submit data'
            });
        }

        setLoading(false);
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'contain',
                            borderRadius: '50%'
                        }}
                    />
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>Unique Brothers - Employee Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Welcome, {user?.username}
                        </p>
                    </div>
                </div>
                <div>
                    <ThemeToggle />
                </div>
            </div>

            <div className="card fade-in">
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                    📊 Enter Today's Sales Data (Excel Format)
                </h2>

                {message.text && (
                    <div className={`alert alert-${message.type} fade-in`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmitAll}>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="table" style={{ marginBottom: '1rem' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>#</th>
                                    <th style={{ minWidth: '200px' }}>Product Name</th>
                                    <th style={{ width: '100px' }}>Quantity</th>
                                    <th style={{ width: '120px' }}>Price (₹)</th>
                                    <th style={{ width: '120px' }}>Total (₹)</th>
                                    <th style={{ minWidth: '180px' }}>Customer Name</th>
                                    <th style={{ width: '140px' }}>Payment Method</th>
                                    <th style={{ width: '80px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={row.id}>
                                        <td style={{ textAlign: 'center', fontWeight: '600' }}>{index + 1}</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="e.g., Laptop, Mouse"
                                                value={row.productName}
                                                onChange={(e) => updateRow(row.id, 'productName', e.target.value)}
                                                style={{ width: '100%', padding: '0.5rem' }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-input"
                                                placeholder="1"
                                                min="1"
                                                value={row.quantity}
                                                onChange={(e) => updateRow(row.id, 'quantity', e.target.value)}
                                                style={{ width: '100%', padding: '0.5rem' }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-input"
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                value={row.price}
                                                onChange={(e) => updateRow(row.id, 'price', e.target.value)}
                                                style={{ width: '100%', padding: '0.5rem' }}
                                            />
                                        </td>
                                        <td style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--success)' }}>
                                            {row.quantity && row.price
                                                ? `₹${(Number(row.quantity) * Number(row.price)).toLocaleString('en-IN')}`
                                                : '₹0'}
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="Customer name"
                                                value={row.customerName}
                                                onChange={(e) => updateRow(row.id, 'customerName', e.target.value)}
                                                style={{ width: '100%', padding: '0.5rem' }}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={row.paymentMethod}
                                                onChange={(e) => updateRow(row.id, 'paymentMethod', e.target.value)}
                                                style={{ width: '100%', padding: '0.5rem' }}
                                            >
                                                <option value="Cash">Cash</option>
                                                <option value="Card">Card</option>
                                                <option value="UPI">UPI</option>
                                                <option value="Net Banking">Net Banking</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {rows.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeRow(row.id)}
                                                    className="btn btn-danger"
                                                    style={{ padding: '0.4rem 0.6rem', fontSize: '0.875rem' }}
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex gap-2" style={{ marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={addRow}
                            className="btn btn-secondary"
                        >
                            ➕ Add Row
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ flex: 1 }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                                    Submitting...
                                </span>
                            ) : (
                                `💾 Submit All Data (${rows.length} ${rows.length === 1 ? 'row' : 'rows'})`
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-3" style={{
                    padding: '1rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)'
                }}>
                    <p>📝 <strong>Instructions:</strong></p>
                    <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>Fill in the Excel-like table above</li>
                        <li>Click "Add Row" to enter multiple sales at once</li>
                        <li>All data will be submitted together</li>
                        <li>Data cannot be viewed after submission</li>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-4 mb-4">
                <button
                    onClick={logout}
                    className="btn btn-secondary"
                    style={{ minWidth: '200px' }}
                >
                    🚪 Logout
                </button>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    &copy; {new Date().getFullYear()} Unique Brothers. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
