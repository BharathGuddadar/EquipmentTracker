
```md
# Equipment Management System

A full-stack web application to manage equipment and their maintenance lifecycle.

This project is structured as a monorepo with:

- /backend (Spring Boot)
- /frontend (React + Tailwind)
- /db (Database scripts)

---

# 🛠 Tech Stack

## Frontend
- React (Functional Components)
- TypeScript
- Tailwind CSS
- Reusable UI components

## Backend
- Spring Boot (Java)
- Layered architecture (Controller, Service, Repository)
- REST APIs
- JPA / Hibernate

## Database
- PostgreSQL

---

# 📦 Project Structure

```

/backend
/frontend
/db
README.md
COMPLIANCE.md

````

---

# 🚀 Backend Setup

## 1. Install Requirements

- Java 17+
- Maven
- PostgreSQL

## 2. Create Database

Open PostgreSQL and run:

```sql
CREATE DATABASE equipment_db;
````

## 3. Configure application.properties

Update:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/equipment_db
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## 4. Run Backend

Inside `/backend`:

```
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

# 💻 Frontend Setup

## 1. Install Dependencies

Inside `/frontend`:

```
npm install
```

## 2. Run Frontend

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🗄 Database Setup

Initial equipment types can be inserted using:

```
/db/init.sql
```

Run:

```sql
INSERT INTO equipment_types (name) VALUES
('Laptop'),
('Printer'),
('Projector');
```

---

# 🔄 Business Logic Implemented

* Maintenance logging updates equipment status to Active
* Maintenance date updates last cleaned date
* Equipment cannot be marked Active if last cleaned date is older than 30 days
* All business rules enforced in backend service layer

---

# 📝 Assumptions

* PostgreSQL runs locally on port 5432
* Default user is postgres
* No authentication layer required
* Equipment types managed directly in DB

---

# 🎯 Bonus

Expandable maintenance history section implemented.

---

# 👨‍💻 How to Test

1. Add Equipment
2. Edit Equipment
3. Delete Equipment
4. Add Maintenance
5. Try marking equipment Active with old cleaning date (validation test)

---
