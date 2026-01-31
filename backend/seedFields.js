const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FieldConfig = require('./models/FieldConfig');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    });

const seedFields = async () => {
    try {
        // Clear existing fields
        await FieldConfig.deleteMany({});
        console.log('🗑️  Cleared existing fields');

        // Create default fields
        const defaultFields = [
            {
                fieldName: 'Product Name',
                fieldType: 'text',
                required: true,
                order: 1,
                isDefault: true
            },
            {
                fieldName: 'Quantity',
                fieldType: 'number',
                required: true,
                order: 2,
                isDefault: true
            },
            {
                fieldName: 'Price',
                fieldType: 'number',
                required: true,
                order: 3,
                isDefault: true
            },
            {
                fieldName: 'Customer Name',
                fieldType: 'text',
                required: true,
                order: 4,
                isDefault: true
            },
            {
                fieldName: 'Payment Method',
                fieldType: 'select',
                options: ['Cash', 'Card', 'UPI', 'Net Banking', 'Other'],
                required: true,
                order: 5,
                isDefault: true
            }
        ];

        await FieldConfig.insertMany(defaultFields);
        console.log('✅ Created default field configurations');

        console.log('\n📋 Default Fields Created:');
        console.log('- Product Name (text)');
        console.log('- Quantity (number)');
        console.log('- Price (number)');
        console.log('- Customer Name (text)');
        console.log('- Payment Method (select)');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding fields:', error);
        process.exit(1);
    }
};

seedFields();
