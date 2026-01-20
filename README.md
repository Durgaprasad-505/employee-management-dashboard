# Employee Management Dashboard

A modern, feature-rich Employee Management Dashboard built with React.js. This application provides a complete solution for managing employee data with authentication, CRUD operations, search, filtering, and print functionality.

## 🎯 Features

### Authentication
- **Login Page** with form validation
- **Mock authentication** (accepts any email/password)
- **Protected routes** - Dashboard only accessible after login
- **Persistent login** using localStorage
- **Logout functionality**

### Dashboard Summary
- **Total Employees** count
- **Active Employees** count and percentage
- **Inactive Employees** count and percentage
- **Activity Rate** visualization
- Real-time statistics updates

### Employee Management
- **View** all employees in a clean, organized table
- **Add** new employees with comprehensive form
- **Edit** existing employee details
- **Delete** employees with confirmation modal
- **Toggle** employee active/inactive status
- **Profile image** upload with preview
- **Form validation** for all required fields

### Search & Filter
- **Search** employees by name (real-time)
- **Filter by Gender** (Male, Female, Other)
- **Filter by Status** (Active, Inactive)
- **Combined filtering** - all filters work together

### Additional Features
- **Print functionality** for employee list
- **Responsive design** - works on desktop, tablet, and mobile
- **Loading states** and empty states
- **Modern UI/UX** with smooth animations
- **Image preview** before saving
- **Age calculation** from date of birth
- **Data persistence** using localStorage

## 🛠️ Tech Stack

- **React.js** (v18.2.0)
- **React Router DOM** (v6.20.0) - For routing
- **Lucide React** (v0.263.1) - For icons
- **Vite** (v5.0.8) - Build tool and dev server
- **CSS3** - For styling (no external CSS frameworks)
- **LocalStorage** - For data persistence

## 📁 Project Structure

```
employee-management-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── DashboardHeader.jsx
│   │   ├── DashboardHeader.css
│   │   ├── DashboardStats.jsx
│   │   ├── DashboardStats.css
│   │   ├── DeleteConfirmModal.jsx
│   │   ├── DeleteConfirmModal.css
│   │   ├── EmployeeForm.jsx
│   │   ├── EmployeeForm.css
│   │   ├── EmployeeTable.jsx
│   │   ├── EmployeeTable.css
│   │   ├── ProtectedRoute.jsx
│   │   ├── SearchFilter.jsx
│   │   └── SearchFilter.css
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── EmployeeContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Login.jsx
│   │   └── Login.css
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v7 or higher) or **yarn**

### Installation Steps

1. **Extract the project files** (if you received a zip file):
   ```bash
   unzip employee-management-dashboard.zip
   cd employee-management-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or if you use yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   or with yarn:
   ```bash
   yarn dev
   ```

4. **Open your browser**:
   The application will automatically open at `http://localhost:3000`
   
   If it doesn't open automatically, manually navigate to:
   ```
   http://localhost:3000
   ```

### Login Credentials

The application uses mock authentication. You can login with **any email and password**.

Example:
- Email: `admin@example.com`
- Password: `anything`

## 📖 Usage Guide

### 1. Login
- Enter any email and password
- Click "Sign In"
- You'll be redirected to the dashboard

### 2. View Employees
- The dashboard displays all employees in a table
- See employee details: ID, photo, name, gender, DOB, age, state, status

### 3. Add Employee
- Click "Add Employee" button
- Fill in all required fields (marked with *)
- Upload a profile image (max 5MB)
- Click "Add Employee" to save

### 4. Edit Employee
- Click the edit icon (pencil) next to any employee
- Modify the desired fields
- Click "Update Employee" to save changes

### 5. Delete Employee
- Click the delete icon (trash) next to any employee
- Confirm the deletion in the popup modal
- The employee will be permanently removed

### 6. Toggle Status
- Click the status badge (Active/Inactive) to toggle
- Status updates immediately

### 7. Search & Filter
- **Search**: Type in the search box to filter by name
- **Gender Filter**: Select Male, Female, Other, or All
- **Status Filter**: Select Active, Inactive, or All
- Filters can be combined for precise results

### 8. Print
- Click "Print List" button
- A print-friendly view will open
- Print or save as PDF

### 9. Logout
- Click the "Logout" button in the header
- You'll be redirected to the login page

## 🎨 Design Decisions

### Color Scheme
- **Primary**: Navy blue (#1a2332) - Professional and trustworthy
- **Accent**: Amber (#f59e0b) - Warm and inviting
- **Background**: Off-white (#fafafa) - Easy on the eyes

### Typography
- **Display Font**: Crimson Pro - Elegant serif for headings
- **Body Font**: DM Sans - Clean and readable sans-serif

### UI/UX Principles
- **Consistency**: Uniform spacing, colors, and interactions
- **Feedback**: Loading states, hover effects, and confirmations
- **Accessibility**: Proper labels, focus states, and semantic HTML
- **Responsiveness**: Mobile-first approach with breakpoints
- **Performance**: Optimized images and lazy loading

### Data Management
- **Context API**: For global state (auth, employees)
- **LocalStorage**: For data persistence across sessions
- **Mock Data**: Pre-populated with 8 sample employees

## 🔧 Configuration

### Changing Port
Edit `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3001, // Change to desired port
  }
})
```

### Adding More States
Edit `src/utils/helpers.js` and modify the `US_STATES` array.

### Changing Validation Rules
Edit `src/components/EmployeeForm.jsx` in the `validate()` function.

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` folder.

To preview the production build:

```bash
npm run preview
```

## 🐛 Troubleshooting

### Dependencies Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Port Already in Use
If port 3000 is busy, the app will automatically try another port, or you can specify one in `vite.config.js`.

### Images Not Loading
The app uses placeholder images from `pravatar.cc` and `ui-avatars.com`. If these services are down, images may not display. Upload custom images for employees to avoid this.

## 🎯 Assignment Checklist

### Step 1: Authentication ✅
- [x] Login page with email/password
- [x] Mock authentication logic
- [x] Redirect to dashboard after login
- [x] Protected routes (no dashboard access without login)

### Step 2: Dashboard ✅
- [x] Total employees count
- [x] Active vs Inactive count
- [x] Employee table with all required columns
- [x] Add employee functionality
- [x] Edit employee functionality
- [x] Delete employee with confirmation
- [x] Active/Inactive toggle
- [x] Print functionality
- [x] Search by name
- [x] Filter by gender
- [x] Filter by status
- [x] Combined filtering
- [x] Image upload with preview
- [x] Form validation
- [x] Modern UI/UX
- [x] Loading states
- [x] Empty states
- [x] Responsive design

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Developer Notes

### Assumptions Made
1. Mock authentication is sufficient (no backend required)
2. LocalStorage is acceptable for data persistence
3. US states are used for the state dropdown
4. Age range for employees: 18-100 years
5. Maximum image size: 5MB
6. Supported image formats: JPEG, PNG, GIF, WebP

### Future Enhancements
- Backend API integration
- Real authentication with JWT
- Database for data persistence
- Export to CSV/Excel
- Advanced analytics
- Role-based access control
- Email notifications
- Employee history tracking
- Bulk operations
- Dark mode

---

**Created with ❤️ using React.js**
