# Student-Teacher Appointment Booking Application

The **Student-Teacher Appointment Booking Application** allows students to book time slots for appointments with their teachers. Admins can manage teachers and students, and teachers can manage their availability for booking. The application is designed with a clean and user-friendly interface using **Tailwind CSS** and provides role-based access for admins, teachers, and students. The application is built using the **MERN stack** and **Vite**.

## Features

- **Role-Based Access Control:**
  - **Admin:** Can manage teachers, view all users, and manage appointments.

  - **Teacher:** Can set availability, view and manage appointments with students.
  - **Student/User:** Can book available slots with teachers and view appointment status.
  
- **Appointment Booking System:**
  - Students can book available slots with their preferred teachers.

  - Teachers can approve or reject booking requests.
  
- **Teacher Availability Management:**
  - Teachers can manage their time slots for availability.
  
- **Admin Panel:**
  - Admins have access to manage teachers and student appointments.

- **Responsive UI:**
  - A modern, mobile-first design using **Tailwind CSS** ensures the app works well on all devices.

## Technologies Used

- **Frontend:** React.js with Vite

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Authentication:** JWT (JSON Web Tokens)
  
## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


#### Admin, Teacher Frontend .env File

`VITE_BASE_URL = <Your-Base-URL>`

#### User Frontend .env File

`VITE_BASE_URL = <Your-Base-URL>`

#### Backend .env File

`PORT = <Port-Number>`

`MONGODB_URI = <Your-DataBase-URL>`

`JWT_SECRET_KEY = "<Your-Secret-Key>"`

`CLOUDINARY_CLOUD_NAME = "<Cloudinary-Cloud-Name>"`

`CLOUDINARY_API_KEY = "<Cloudinary-Api-Key>"`

`CLOUDINARY_API_SECRET = "m<Cloudinary-Api-Secret>"`

`ADMIN_EMAIL = <Your-Admin-Email>`

`ADMIN_PASSWORD = <Your-Admin-Password>`

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jay5000-bhatt/Appointment-Booking-App.git
   cd appointment-booking-app



## Authors

- [@Jay5000-bhatt](https://github.com/Jay5000-bhatt)


