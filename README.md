# SHOPTRACK API

Sebuah REST API sederhana untuk mengelola pengguna, kategori produk, dan inventaris produk. Dibangun dengan Express.js dan MySQL sebagai proyek pembelajaran.

---

## 🚀 Quick Start

### Prerequisites

- Node.js v14+
- MySQL 5.7+
- npm atau yarn

### Installation

1. **Clone atau download project**

```bash
git clone https://github.com/Yosuammwowor/simple-shoptrack.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

- Buat file `.env` di root folder:

```env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_PORT=3306
DB_DATABASE=shoptrack
```

- Atau rename file `.env.example` menjadi `.env`, kemudian sesuaikan variabel environment.

4. **Setup database**
   Buat database dan tabel:

```sql
CREATE DATABASE shoptrack;

USE shoptrack;

-- Users table
CREATE TABLE users (
  id VARCHAR(21) PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id VARCHAR(21) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id VARCHAR(21) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category_id VARCHAR(21),
  user_id VARCHAR(21),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

5. **Run server**

```bash
npm start
```

Server akan berjalan di `http://localhost:8000` atau `http://localhost:3000`

---

## 📡 API Endpoints

### 1. Users

| Method | Endpoint     | Deskripsi               |
| ------ | ------------ | ----------------------- |
| GET    | `/users`     | Dapatkan semua pengguna |
| POST   | `/users`     | Buat pengguna baru      |
| PUT    | `/users/:id` | Update data pengguna    |
| DELETE | `/users/:id` | Hapus pengguna          |

#### POST /users

**Request:**

```json
{
  "username": "test",
  "email": "test@example.com",
  "password": "pass123"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Data successfully added!"
}
```

#### PUT /users/:id

**Request:**

```json
{
  "username": "test",
  "email": "test@example.com",
  "password": "pass123"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Data successfully updated!"
}
```

---

### 2. Categories

| Method | Endpoint          | Deskripsi                  |
| ------ | ----------------- | -------------------------- |
| GET    | `/categories`     | Dapatkan semua kategori    |
| GET    | `/categories/:id` | Dapatkan kategori spesifik |
| POST   | `/categories`     | Buat kategori baru         |
| PUT    | `/categories/:id` | Update kategori            |
| DELETE | `/categories/:id` | Hapus kategori             |

#### POST /categories

**Request:**

```json
{
  "name": "Electronics",
  "description": "Perangkat elektronik dan gadget"
}
```

**Response (201):**

```json
{
  "status": "success",
  "message": "Data successfully added!"
}
```

#### GET /categories

**Response (200):**

```json
{
  "status": "success",
  "data": [
    {
      "id": "abc123xyz",
      "name": "Electronics",
      "description": "Perangkat elektronik dan gadget",
      "created_at": "2024-04-04T10:30:00",
      "updated_at": "2024-04-04T10:30:00"
    }
  ]
}
```

---

### 3. Products

| Method | Endpoint        | Deskripsi                |
| ------ | --------------- | ------------------------ |
| GET    | `/products`     | Dapatkan semua produk    |
| GET    | `/products/:id` | Dapatkan produk spesifik |
| POST   | `/products`     | Buat produk baru         |
| PUT    | `/products/:id` | Update produk            |
| DELETE | `/products/:id` | Hapus produk             |

#### POST /products

**Request:**

```json
{
  "name": "Laptop Dell XPS 13",
  "price": 1299.99,
  "category_id": "abc123xyz",
  "user_id": "user456abc"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Data successfully added!"
}
```

**Catatan:** `category_id` dan `user_id` bersifat opsional (bisa null).

#### GET /products

**Response (200):**

```json
{
  "status": "success",
  "data": [
    {
      "id": "prod789def",
      "name": "Laptop Dell XPS 13",
      "price": "1299.99",
      "category_id": "abc123xyz",
      "user_id": "user456abc",
      "created_at": "2024-04-04T11:00:00",
      "updated_at": "2024-04-04T11:00:00"
    }
  ]
}
```

---

## 🔧 Project Structure

```
project/
├── app.js                      # Entry point
├── config/
│   └── database.js             # MySQL pool configuration
├── models/
│   ├── User.js                 # User model dengan methods
│   ├── Category.js             # Category model
│   └── Product.js              # Product model
├── controllers/
│   ├── userController.js       # User business logic
│   ├── categoryController.js   # Category business logic
│   └── productController.js    # Product business logic
├── routes/
│   ├── userRoute.js            # User routes
│   ├── categoryRoute.js        # Category routes
│   └── productRoute.js         # Product routes
├── package.json
├── .env                        # Environment variables (tidak di-commit)
└── .env.example                # Template environment variables
```

---

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0", // Password hashing
  "express": "^5.2.1", // Web framework
  "mysql2": "^3.20.0", // MySQL driver with promise support
  "nanoid": "^5.1.7" // Generate unique IDs
}
```

### Dev Dependencies (Recommended)

```bash
npm install --save-dev nodemon   # Auto-restart server
npm install --save-dev eslint    # Code linting
npm install --save-dev prettier  # Code formatting
```

---

## 🛡️ HTTP Status Codes

| Code | Meaning                                 |
| ---- | --------------------------------------- |
| 200  | OK - Request berhasil                   |
| 201  | Created - Resource baru berhasil dibuat |
| 400  | Bad Request - Input tidak valid         |
| 404  | Not Found - Resource tidak ditemukan    |
| 409  | Conflict - Data sudah ada (duplikat)    |
| 500  | Internal Server Error - Error server    |

---

## ⚠️ Validation Rules

### Users

- `username`: String, minimal 3 karakter
- `email`: String, format email valid
- `password`: String, minimal 8 karakter

### Categories

- `name`: String, unik di database
- `description`: String, opsional

### Products

- `name`: String, required
- `price`: Number, harus positif
- `category_id`: String (UUID), opsional, bisa null
- `user_id`: String (UUID), opsional, bisa null

---

## 🔐 Security Notes

**Sudah diimplementasi:**

- ✅ Parameterized queries (prevent SQL injection)
- ✅ Password hashing dengan bcrypt
- ✅ Connection pooling dengan resource limits

**Belum diimplementasi:**

- ❌ Authentication & Authorization
- ❌ Rate limiting
- ❌ Input sanitization
- ❌ CORS configuration
- ❌ Request validation middleware

> **Catatan:** Proyek ini adalah hasil pembelajaran dasar REST API. Fokus pada pola MVC, async database operations, dan connection pooling.

---

## 📝 Usage Example

### Dengan cURL

```bash
# Get all users
curl http://localhost:3000/users

# Create new user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"pass123"}'

# Get all categories
curl http://localhost:3000/categories

# Create new category
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Fashion","description":"Pakaian dan aksesori"}'

# Create new product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Shirt","price":30,"category_id":"cat_id_here"}'
```

### Dengan Postman

1. Import endpoints dari file (atau manual setup)
2. Set URL base: `http://localhost:8000` atau `http://localhost:3000`
3. Refresh data sebelum testing
4. Test setiap endpoint satu per satu

Note : Project API dapat diakses juga secara online / cloud menggunakan link berikut: `https://simple-shoptrack.vercel.app/`

---

## 📄 License

ISC License - Bebas untuk pembelajaran dan modifikasi pribadi

---

## 👤 Author

**Yosua** - Learning Project

- Email: yosuammwowor@gmail.com

---

## 📚 Referensi & Resources

- [Express.js Documentation](https://expressjs.com/)
- [MySQL2 Documentation](https://github.com/sidorares/node-mysql2)
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)

---

**Terakhir diupdate:** 4 April 2026
