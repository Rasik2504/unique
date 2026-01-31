import * as XLSX from 'xlsx';

export const exportToExcel = (data, filename) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Data');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportDailyData = (allData) => {
    // Get today's date at midnight for proper comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayData = allData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= today && itemDate < tomorrow;
    });

    if (todayData.length === 0) {
        alert('No data available for today!');
        return;
    }

    const formattedData = todayData.map(item => ({
        'Date': new Date(item.date).toLocaleDateString('en-IN'),
        'Product Name': item.productName,
        'Quantity': item.quantity,
        'Price (Rs)': item.price,
        'Total (Rs)': item.quantity * item.price,
        'Customer Name': item.customerName,
        'Payment Method': item.paymentMethod,
        'Entered By': item.enteredBy?.username || 'N/A'
    }));

    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `Daily_Sales_${dateStr}`;
    exportToExcel(formattedData, filename);
};

export const exportMonthlyData = (allData) => {
    // Get current month's start and end dates
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    monthStart.setHours(0, 0, 0, 0);

    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    monthEnd.setHours(23, 59, 59, 999);

    const monthData = allData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= monthStart && itemDate <= monthEnd;
    });

    if (monthData.length === 0) {
        alert('No data available for this month!');
        return;
    }

    const formattedData = monthData.map(item => ({
        'Date': new Date(item.date).toLocaleDateString('en-IN'),
        'Product Name': item.productName,
        'Quantity': item.quantity,
        'Price (Rs)': item.price,
        'Total (Rs)': item.quantity * item.price,
        'Customer Name': item.customerName,
        'Payment Method': item.paymentMethod,
        'Entered By': item.enteredBy?.username || 'N/A'
    }));

    // Format: Monthly_Sales_January_2026
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const filename = `Monthly_Sales_${monthName}_${year}`;

    exportToExcel(formattedData, filename);
};

export const exportAllData = (allData) => {
    if (allData.length === 0) {
        alert('No data available to export!');
        return;
    }

    const formattedData = allData.map(item => ({
        'Date': new Date(item.date).toLocaleDateString('en-IN'),
        'Product Name': item.productName,
        'Quantity': item.quantity,
        'Price (Rs)': item.price,
        'Total (Rs)': item.quantity * item.price,
        'Customer Name': item.customerName,
        'Payment Method': item.paymentMethod,
        'Entered By': item.enteredBy?.username || 'N/A'
    }));

    const filename = `All_Sales_Data_${new Date().toISOString().split('T')[0]}`;
    exportToExcel(formattedData, filename);
};
