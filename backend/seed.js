const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

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

const seedUsers = async () => {
    try {
        // Clear existing users
        await User.deleteMany({});
        console.log('🗑️  Cleared existing users');

        // Create owner account
        const owner = await User.create({
            username: 'admin1',
            email: 'admin@uniquebrothers.com',
            password: 'unique123',
            role: 'owner',
            contactNumber: '1234567890'
        });
        console.log('✅ Created owner account');

        // Create employee account
        const employee = await User.create({
            username: 'staff1',
            email: 'staff@uniquebrothers.com',
            password: 'unique123',
            role: 'employee',
            contactNumber: '0987654321'
        });
        console.log('✅ Created employee account');

        console.log('\n📋 New Credentials:');
        console.log('Owner    - Username: admin1,   Password: unique123');
        console.log('Employee - Username: staff1,   Password: unique123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedUsers();
