# PickMeUpAI - Landing Page & Waitlist

Where former athletes can build community and rediscover their competitive edge.

## 🚀 Features

- **Modern, Responsive Design** - Beautiful landing page that works on all devices
- **Waitlist System** - Collect signups with sport and competition level data
- **Interactive Elements** - Smooth animations and engaging user experience
- **Backend API** - Node.js server to handle waitlist submissions
- **Data Storage** - JSON-based storage for waitlist entries
- **Statistics** - Track signups by sport and competition level

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
PickMeUpAI/
├── index.html          # Main landing page
├── styles.css          # All CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Backend Express server
├── package.json        # Node.js dependencies
├── waitlist.json       # Waitlist data (auto-generated)
└── README.md          # This file
```

## 🎯 Landing Page Sections

1. **Hero Section** - Compelling headline and call-to-action
2. **Features** - 6 key features of the app
3. **Community** - Social proof and testimonials
4. **Waitlist** - Signup form with sport/level selection
5. **Footer** - Links and social media

## 📊 Waitlist Features

- **Form Validation** - Client and server-side validation
- **Duplicate Prevention** - Prevents duplicate email submissions
- **Data Collection** - Name, email, sport, competition level
- **Statistics API** - Track signups by sport and level
- **JSON Storage** - Simple file-based storage

## 🔧 API Endpoints

- `GET /` - Serve landing page
- `POST /api/waitlist` - Submit waitlist entry
- `GET /api/waitlist/stats` - Get waitlist statistics
- `GET /api/health` - Health check

## 📈 Waitlist Statistics

The system tracks:
- Total signups
- Signups by sport
- Signups by competition level
- Recent signups (last 7 days)

## 🎨 Design Features

- **Athletic Color Scheme** - Blue gradients and modern styling
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - CSS transitions and JavaScript animations
- **Interactive Elements** - Hover effects and micro-interactions
- **Accessibility** - Proper semantic HTML and ARIA labels

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
- `PORT` - Server port (default: 3000)

## 📧 Waitlist Data

Waitlist entries are stored in `waitlist.json` with the following structure:

```json
{
  "id": "timestamp",
  "name": "User Name",
  "email": "user@example.com",
  "sport": "basketball",
  "level": "college",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Security Considerations

- Input validation on both client and server
- Email format validation
- Duplicate email prevention
- CORS enabled for API access
- Error handling for all endpoints

## 🎯 Target Audience

- Former high school athletes
- Former college athletes
- Former professional athletes
- Recreational athletes seeking community
- Anyone who misses competitive sports

## 🚀 Future Enhancements

- Email notifications for new signups
- Admin dashboard for waitlist management
- Integration with email marketing services
- Database migration (PostgreSQL/MongoDB)
- Analytics and tracking
- A/B testing capabilities

## 📞 Support

For questions or issues, please check the code comments or create an issue in the repository.

---

**Built with ❤️ for former athletes everywhere** 
