# Notion Clone

A modern, full-featured Notion clone built with Next.js, TypeScript, React, Clerk, Prisma, and MongoDB. This project demonstrates building a productivity app with authentication, rich text editing, and database management.

## Features

-  **Authentication** - Secure user authentication with Clerk
-  **Rich Text Editor** - Powerful editor with TipTap for formatting, lists, code blocks, and more
-  **Document Management** - Create, edit, and organize documents
-  **Modern UI** - Beautiful, responsive design with Tailwind CSS
-  **Performance** - Optimized for speed and efficiency
-  **Responsive** - Works seamlessly on all devices
-  **Dark Mode** - Built-in dark mode support

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Authentication**: Clerk
- **Database**: MongoDB with Prisma ORM
- **Editor**: TipTap (rich text editor)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud)
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notion_clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/notion-clone?retryWrites=true&w=majority"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   # Webhook (optional)
   WEBHOOK_SECRET=your_webhook_secret
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── documents/         # Document pages
│   ├── sign-in/           # Authentication pages
│   └── sign-up/
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── document-editor.tsx
│   ├── rich-text-editor.tsx
│   └── ...
├── lib/                  # Utility functions
│   ├── database.ts       # Database operations
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
└── middleware.ts         # Clerk middleware
```

<!-- ## Key Features

### Rich Text Editor
- Bold, italic, underline, strikethrough
- Headings (H1, H2, H3)
- Bullet and numbered lists
- Blockquotes and code blocks
- Text alignment
- Text highlighting and colors
- Real-time collaboration ready

### Document Management
- Create new documents
- Edit document titles
- Organize documents
- Delete documents
- Auto-save functionality

### Authentication
- Secure sign-in/sign-up
- User profile management
- Protected routes
- Webhook integration for user sync

## Database Schema

The app uses MongoDB with the following main models:

- **User**: User information from Clerk
- **Document**: Top-level documents/folders
- **Page**: Individual pages within documents
- **Block**: Rich text content blocks

## Performance Optimizations

- Database query optimization
- Efficient component rendering
- Image optimization
- Code splitting
- Caching strategies

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication
- [Prisma](https://prisma.io/) - Database ORM
- [TipTap](https://tiptap.dev/) - Rich text editor
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI components -->