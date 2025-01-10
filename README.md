# Task Management Application

A modern, secure task management application built with React, TypeScript, and Supabase. This application allows users to create, manage, and track their tasks with a beautiful and intuitive interface.

![Task Manager Screenshot](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072)

## Features

- 🔐 Secure authentication system
- ✨ Clean and intuitive user interface
- ✅ Create, read, update, and delete tasks
- 🔄 Real-time updates
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔒 Row Level Security with Supabase

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your-project-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Database Schema

The application uses a single `tasks` table with the following structure:

- `id`: UUID (Primary Key)
- `title`: Text (Required)
- `completed`: Boolean (Default: false)
- `user_id`: UUID (References auth.users)
- `created_at`: Timestamp with timezone

## Security

- Row Level Security (RLS) is enabled on the tasks table
- Users can only access their own tasks
- Authentication is handled securely by Supabase
- Environment variables are used for sensitive credentials

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)
