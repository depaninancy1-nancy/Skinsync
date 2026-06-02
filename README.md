# SkinSync - Skincare Tracking Application

SkinSync is a comprehensive skincare tracking application that helps users monitor their skincare routines, products, skin conditions, and progress over time. Designed for both males and females to maintain healthy skincare habits.

## Features

- 👤 **User Authentication** - Secure login and registration
- 📋 **Routine Tracking** - Log daily skincare routines
- 🧴 **Product Management** - Track skincare products and their usage
- 📊 **Progress Monitoring** - Visual progress tracking with photos
- 📈 **Analytics** - Skin condition analytics and insights
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Beautiful UI** - Modern, clean, and intuitive interface

## Tech Stack

### Frontend
- HTML5
- CSS3 (Responsive Design)
- JavaScript (Vanilla JS + AJAX)

### Backend
- Python (Flask)
- RESTful API

### Database
- MySQL / Oracle SQL

## Project Structure

```
Skinsync/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── auth.js
│   └── tracker.js
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   ├── requirements.txt
│   └── routes/
│       ├── auth.py
│       ├── tracker.py
│       └── products.py
├── database/
│   ├── schema.sql
│   └── sample_data.sql
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.8+
- MySQL 5.7+ or Oracle Database
- Node.js (optional, for build tools)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/depaninancy1-nancy/Skinsync.git
   cd Skinsync
   ```

2. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure the database**
   - Edit `backend/config.py` with your database credentials
   - Run the schema: `mysql -u user -p database_name < ../database/schema.sql`

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5000`

## Database Setup

### MySQL
```bash
mysql -u root -p < database/schema.sql
```

### Oracle
```bash
sqlplus user/password < database/schema.sql
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/routines` - Get user routines
- `POST /api/routines` - Create new routine
- `GET /api/products` - Get user products
- `POST /api/products` - Add new product
- `GET /api/progress` - Get progress data
- `POST /api/progress` - Log progress

## Contributing

Contributions are welcome! Please follow the coding standards and submit pull requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please create an issue on GitHub.

---

**Made with ❤️ for healthy skin**
