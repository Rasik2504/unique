import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
    Image,
    RefreshControl,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { dataAPI } from '../services/api';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

export default function OwnerScreen() {
    const { user, logout } = useAuth();
    const [data, setData] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [dataResponse, statsResponse] = await Promise.all([
                dataAPI.getAll(),
                dataAPI.getStats(),
            ]);
            setData(dataResponse.data.data);
            setStats(statsResponse.data.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch data');
        }
        setLoading(false);
        setRefreshing(false);
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const handleDelete = async (id, productName) => {
        Alert.alert(
            'Delete Entry',
            `Are you sure you want to delete "${productName}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await dataAPI.delete(id);
                            Alert.alert('Success', 'Entry deleted successfully');
                            fetchData();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete entry');
                        }
                    },
                },
            ]
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

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
                        <Text style={styles.headerSubtitle}>Owner Dashboard</Text>
                        <Text style={styles.userName}>Welcome, {user?.username}</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={COLORS.primary} />
                }
            >
                {/* Statistics */}
                {stats && (
                    <View style={styles.statsContainer}>
                        <View style={[styles.statCard, { borderTopColor: COLORS.success }]}>
                            <View style={styles.statHeader}>
                                <Text style={styles.statLabel}>Total Sales</Text>
                                <Text style={styles.statIcon}>💰</Text>
                            </View>
                            <Text style={[styles.statValue, { color: COLORS.success }]}>
                                ₹{stats.totalSales?.toLocaleString('en-IN') || 0}
                            </Text>
                        </View>

                        <View style={[styles.statCard, { borderTopColor: COLORS.primary }]}>
                            <View style={styles.statHeader}>
                                <Text style={styles.statLabel}>Total Entries</Text>
                                <Text style={styles.statIcon}>📦</Text>
                            </View>
                            <Text style={[styles.statValue, { color: COLORS.primary }]}>
                                {stats.totalEntries || 0}
                            </Text>
                        </View>

                        <View style={[styles.statCard, { borderTopColor: COLORS.accent }]}>
                            <View style={styles.statHeader}>
                                <Text style={styles.statLabel}>Average Sale</Text>
                                <Text style={styles.statIcon}>📈</Text>
                            </View>
                            <Text style={[styles.statValue, { color: COLORS.accent }]}>
                                ₹{stats.avgSale?.toFixed(2) || 0}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Data List */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>All Sales Data</Text>

                    {data.length === 0 ? (
                        <Text style={styles.emptyText}>No data entries yet</Text>
                    ) : (
                        data.map((item) => (
                            <View key={item._id} style={styles.dataItem}>
                                <View style={styles.dataHeader}>
                                    <Text style={styles.dataDate}>{formatDate(item.date)}</Text>
                                    <Text style={styles.dataTotal}>
                                        ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                                    </Text>
                                </View>

                                <Text style={styles.dataProduct}>{item.productName}</Text>

                                <View style={styles.dataDetails}>
                                    <Text style={styles.dataDetailText}>
                                        Qty: {item.quantity} × ₹{item.price}
                                    </Text>
                                    <Text style={styles.dataDetailText}>•</Text>
                                    <Text style={styles.dataDetailText}>{item.paymentMethod}</Text>
                                </View>

                                <Text style={styles.dataCustomer}>Customer: {item.customerName}</Text>
                                <Text style={styles.dataEnteredBy}>
                                    Entered by: {item.enteredBy?.username || 'N/A'}
                                </Text>

                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDelete(item._id, item.productName)}
                                >
                                    <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
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
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
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
    statsContainer: {
        marginBottom: SPACING.md,
    },
    statCard: {
        backgroundColor: COLORS.bgSecondary,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        borderTopWidth: 4,
    },
    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    statLabel: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    statIcon: {
        fontSize: FONTS.sizes.xl,
    },
    statValue: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: '700',
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
    emptyText: {
        fontSize: FONTS.sizes.base,
        color: COLORS.textSecondary,
        textAlign: 'center',
        paddingVertical: SPACING.xl,
    },
    dataItem: {
        backgroundColor: COLORS.bgTertiary,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    dataHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    dataDate: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
    },
    dataTotal: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.success,
    },
    dataProduct: {
        fontSize: FONTS.sizes.base,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    dataDetails: {
        flexDirection: 'row',
        gap: SPACING.xs,
        marginBottom: SPACING.xs,
    },
    dataDetailText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    dataCustomer: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs / 2,
    },
    dataEnteredBy: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textMuted,
        marginBottom: SPACING.sm,
    },
    deleteButton: {
        backgroundColor: COLORS.error,
        borderRadius: RADIUS.md,
        padding: SPACING.sm,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
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
