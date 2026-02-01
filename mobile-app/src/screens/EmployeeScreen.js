import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../contexts/AuthContext';
import { dataAPI } from '../services/api';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

export default function EmployeeScreen() {
    const { user, logout } = useAuth();
    const [form, setForm] = useState({
        productName: '',
        quantity: '',
        price: '',
        customerName: '',
        paymentMethod: 'Cash',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!form.productName || !form.quantity || !form.price || !form.customerName) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await dataAPI.create({
                productName: form.productName,
                quantity: Number(form.quantity),
                price: Number(form.price),
                customerName: form.customerName,
                paymentMethod: form.paymentMethod,
                date: new Date(),
            });

            Alert.alert('Success', 'Sales data submitted successfully!');
            // Reset form
            setForm({
                productName: '',
                quantity: '',
                price: '',
                customerName: '',
                paymentMethod: 'Cash',
            });
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to submit data');
        }
        setLoading(false);
    };

    const total = form.quantity && form.price
        ? (Number(form.quantity) * Number(form.price)).toFixed(2)
        : '0.00';

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View>
                        <Text style={styles.headerTitle}>Unique Brothers</Text>
                        <Text style={styles.headerSubtitle}>Employee Dashboard</Text>
                        <Text style={styles.userName}>Welcome, {user?.username}</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>📊 Enter Today's Sales Data</Text>

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Product Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., Laptop, Mouse"
                                placeholderTextColor={COLORS.textMuted}
                                value={form.productName}
                                onChangeText={(text) => setForm({ ...form, productName: text })}
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, styles.halfWidth]}>
                                <Text style={styles.label}>Quantity *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="1"
                                    placeholderTextColor={COLORS.textMuted}
                                    value={form.quantity}
                                    onChangeText={(text) => setForm({ ...form, quantity: text })}
                                    keyboardType="numeric"
                                    editable={!loading}
                                />
                            </View>

                            <View style={[styles.inputGroup, styles.halfWidth]}>
                                <Text style={styles.label}>Price (₹) *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="0.00"
                                    placeholderTextColor={COLORS.textMuted}
                                    value={form.price}
                                    onChangeText={(text) => setForm({ ...form, price: text })}
                                    keyboardType="decimal-pad"
                                    editable={!loading}
                                />
                            </View>
                        </View>

                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Total Amount:</Text>
                            <Text style={styles.totalValue}>₹{total}</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Customer Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Customer name"
                                placeholderTextColor={COLORS.textMuted}
                                value={form.customerName}
                                onChangeText={(text) => setForm({ ...form, customerName: text })}
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Payment Method *</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={form.paymentMethod}
                                    onValueChange={(value) => setForm({ ...form, paymentMethod: value })}
                                    style={styles.picker}
                                    dropdownIconColor={COLORS.textPrimary}
                                    enabled={!loading}
                                >
                                    <Picker.Item label="Cash" value="Cash" />
                                    <Picker.Item label="Card" value="Card" />
                                    <Picker.Item label="UPI" value="UPI" />
                                    <Picker.Item label="Net Banking" value="Net Banking" />
                                    <Picker.Item label="Other" value="Other" />
                                </Picker>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.submitButton, loading && styles.buttonDisabled]}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={COLORS.white} />
                            ) : (
                                <Text style={styles.submitButtonText}>💾 Submit Data</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoTitle}>📝 Instructions:</Text>
                        <Text style={styles.infoText}>• Fill in all required fields</Text>
                        <Text style={styles.infoText}>• Data can only be entered for today</Text>
                        <Text style={styles.infoText}>• Data cannot be viewed after submission</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutButtonText}>🚪 Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
    },
    header: {
        backgroundColor: COLORS.bgSecondary,
        padding: SPACING.md,
        paddingTop: SPACING.xl + 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
    },
    headerTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.primary,
    },
    headerSubtitle: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    userName: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: SPACING.md,
    },
    card: {
        backgroundColor: COLORS.bgSecondary,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
    },
    cardTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
    },
    form: {
        marginBottom: SPACING.md,
    },
    inputGroup: {
        marginBottom: SPACING.md,
    },
    row: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    halfWidth: {
        flex: 1,
    },
    label: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    input: {
        backgroundColor: COLORS.bgTertiary,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        fontSize: FONTS.sizes.base,
        color: COLORS.textPrimary,
    },
    pickerContainer: {
        backgroundColor: COLORS.bgTertiary,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        overflow: 'hidden',
    },
    picker: {
        color: COLORS.textPrimary,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.bgTertiary,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        marginBottom: SPACING.md,
    },
    totalLabel: {
        fontSize: FONTS.sizes.base,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    totalValue: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '700',
        color: COLORS.success,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.base,
        fontWeight: '600',
    },
    infoBox: {
        backgroundColor: COLORS.bgTertiary,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
    },
    infoTitle: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    infoText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs / 2,
    },
    footer: {
        padding: SPACING.md,
        backgroundColor: COLORS.bgSecondary,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    logoutButton: {
        backgroundColor: COLORS.bgTertiary,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: COLORS.textPrimary,
        fontSize: FONTS.sizes.base,
        fontWeight: '600',
    },
});
