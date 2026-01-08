# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-01-07

### Added

#### Customer Management
- Customer management system with create, read, update operations
- Search functionality to filter customers by name or address
- Sort options for customer list (name A-Z/Z-A, order count)
- Customer details modal with complete order history
- Add new customer modal with initial order input
- Timestamp tracking for customer creation and updates

#### Order Management
- Order tracking with full CRUD capabilities for each customer
- Edit order modal with quantity modification
- Delete order functionality with confirmation dialog
- Order history display with formatted dates and times

#### Sales Analytics
- Real-time daily, and monthly sales totals displayed on home dashboard
- Sales analytics dashboard with interactive charts
- Sales trend line chart showing 6-month historical data
- Top customers pie chart based on gallon purchases
- Order distribution bar chart with monthly breakdown
- Time range filters for analytics (7 days, 30 days, this month, last month)

#### Authentication & Navigation
- Authentication system with login page and session management
- Protected routes requiring authentication to access
- Sidebar navigation with active route highlighting
- User profile display in sidebar showing logged-in username
- Logout functionality with redirect to login
- Auto-redirect for unauthenticated users to login page and for authenticated users away from login page

#### Data Management
- IndexedDB integration via Dexie for persistent local storage
- Sample data initialization for new users (2 customers with historical orders)

#### User Experience
- Loading states with animated spinners throughout app
- Error handling with user-friendly messages and retry options
- Responsive design supporting mobile, tablet, and desktop viewports
- Sticky sales cards on desktop layout
- Hover effects and transitions on interactive elements
- Form validation using Zod schemas with real-time error messages
- Custom water-themed icon set (water drop, bottle, truck, etc.)

### Security
- Client-side authentication guard on all protected routes
- Input validation and sanitization on all forms
- XSS protection through React's built-in escaping
- Session storage using localStorage with authentication flags

[Unreleased]: https://github.com/Telemondo-Technologies-Development/watermart-tracker-react/tree/sprint/2026-1-v1
[1.0.0]: https://github.com/Telemondo-Technologies-Development/watermart-tracker-react/tree/dev