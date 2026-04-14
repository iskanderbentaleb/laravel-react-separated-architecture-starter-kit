📦 Laravel + React Separated Architecture Starter Kit
This project is built with Laravel (API backend) and React.js (frontend).  
It follows a **fully separated architecture**, where backend and frontend are independent applications communicating via REST API.

---

🔐 Key Features
- Laravel REST API backend
- React.js modern frontend
- Laravel Sanctum authentication
- Fully separated architecture (decoupled frontend/backend)
- Multi-language ready structure (i18n support) / french / english
- Scalable and clean project structure
- File upload support via Laravel storage

---

⚙️ Installation Instructions
Follow these steps to install and run the project locally:

Clone the Repository :
<pre>
git clone https://github.com/iskanderbentaleb/laravel-react-separated-architecture-starter-kit.git
cd laravel-react-separated-architecture-starter-kit
</pre>

---------------------------------------------------- Backend ----------------------------------------------------

1. Install Backend Dependencies (Laravel API)
<pre>
cd backend
composer install
cp .env.example .env
php artisan key:generate
</pre>

2. Set Up Environment Variables:
Update your `.env` file with your database credentials:
<pre>
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=laravel_react_app
DB_USERNAME=root
DB_PASSWORD=
</pre>

3. Run Database Migrations:
<pre>
php artisan migrate
</pre>

4. Create Storage Link:
<pre>
php artisan storage:link
</pre>

5. Run Laravel Server:
<pre>
php artisan serve
</pre>

Backend will run at:
<pre>
http://127.0.0.1:8000
</pre>

---------------------------------------------------- Frontend ----------------------------------------------------

1. Install Frontend Dependencies (React JS)
<pre>
cd frontend
npm install
cp .env.example .env
</pre>

2. Set Up Environment Variables:
<pre>
VITE_BACKEND_URL=http://localhost:8000
</pre>

3. Run the Frontend:
<pre>
npm run dev
</pre>

Frontend will run at:
<pre>
http://localhost:3000
</pre>

---

📁 Project Structure
<pre>
backend/   → Laravel API
frontend/  → React App
</pre>

---

🧠 Notes
- Make sure backend is running before frontend
- Ensure `.env` files are properly configured
- Run `php artisan storage:link` for file uploads
- This project uses a fully decoupled architecture (API-based)