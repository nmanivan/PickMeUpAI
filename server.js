const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Waitlist data storage (in production, use a database)
const WAITLIST_FILE = 'waitlist.json';

// Initialize waitlist file if it doesn't exist
if (!fs.existsSync(WAITLIST_FILE)) {
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify([]));
}

// Helper function to read waitlist
function readWaitlist() {
    try {
        const data = fs.readFileSync(WAITLIST_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading waitlist:', error);
        return [];
    }
}

// Helper function to write waitlist
function writeWaitlist(waitlist) {
    try {
        fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing waitlist:', error);
        return false;
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to submit waitlist entry
app.post('/api/waitlist', (req, res) => {
    try {
        const { name, email, sport, level } = req.body;
        
        // Validate required fields
        if (!name || !email || !sport || !level) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }
        
        // Check if email already exists
        const waitlist = readWaitlist();
        const existingEntry = waitlist.find(entry => entry.email === email);
        
        if (existingEntry) {
            return res.status(400).json({
                success: false,
                message: 'This email is already on our waitlist!'
            });
        }
        
        // Create new waitlist entry
        const newEntry = {
            id: Date.now().toString(),
            name,
            email,
            sport,
            level,
            timestamp: new Date().toISOString()
        };
        
        // Add to waitlist
        waitlist.push(newEntry);
        
        if (writeWaitlist(waitlist)) {
            // Log the submission
            console.log(`New waitlist entry: ${name} (${email}) - ${sport} at ${level} level`);
            
            res.json({
                success: true,
                message: 'Thank you for joining our waitlist! We\'ll be in touch soon.',
                data: {
                    id: newEntry.id,
                    timestamp: newEntry.timestamp
                }
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to save your information. Please try again.'
            });
        }
        
    } catch (error) {
        console.error('Error processing waitlist submission:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred. Please try again.'
        });
    }
});

// API endpoint to get waitlist statistics (for admin purposes)
app.get('/api/waitlist/stats', (req, res) => {
    try {
        const waitlist = readWaitlist();
        
        // Calculate statistics
        const stats = {
            total: waitlist.length,
            sports: {},
            levels: {},
            recent: waitlist.filter(entry => {
                const entryDate = new Date(entry.timestamp);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return entryDate > weekAgo;
            }).length
        };
        
        // Count by sport
        waitlist.forEach(entry => {
            stats.sports[entry.sport] = (stats.sports[entry.sport] || 0) + 1;
        });
        
        // Count by level
        waitlist.forEach(entry => {
            stats.levels[entry.level] = (stats.levels[entry.level] || 0) + 1;
        });
        
        res.json({
            success: true,
            data: stats
        });
        
    } catch (error) {
        console.error('Error getting waitlist stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve statistics'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 PickMeUpAI landing page server running on port ${PORT}`);
    console.log(`📧 Waitlist submissions will be saved to ${WAITLIST_FILE}`);
    console.log(`🌐 Open http://localhost:${PORT} to view the landing page`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server gracefully...');
    process.exit(0);
}); 