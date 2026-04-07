# Task Management System with NestJS, Prisma, and Role-Based Access

A comprehensive task management system built with NestJS, featuring role-based access control, audit logging, and JWT authentication.

## Features

- **User Management**: Role-based access with ADMIN and USER roles
- **Task Management**: Full CRUD operations for tasks with status tracking
- **Audit Logging**: Comprehensive logging of all important actions
- **Authentication**: JWT-based authentication with Passport.js
- **Database**: Prisma ORM with PostgreSQL
- **Validation**: Class-validator for DTOs
- **API Documentation**: Swagger/OpenAPI
- **Error Handling**: Global exception filters
- **Docker**: Containerized setup

## User Roles

### Admin
- Create, update, delete tasks
- Assign tasks to users
- View all tasks
- View audit logs

### User
- View assigned tasks
- Update task status (PENDING → PROCESSING → DONE)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/me` - Get current user info

### Tasks (Admin)
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Tasks (User)
- `GET /api/tasks/my` - Get assigned tasks
- `PATCH /api/tasks/:id` - Update task status (only if assigned)

### Audit Logs (Admin only)
- `GET /api/audit/logs` - Get all audit logs

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task-management-system
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT secret key

4. Set up the database:

```bash
npx prisma migrate dev
npx prisma db seed
```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Predefined Users

After seeding, you can login with:

**Admin User:**
- Email: `admin@petzy.com`
- Password: `12345678`

**Normal User:**
- Email: `user@petzy.com`
- Password: `12345678`

## Task Status Flow

Tasks have three statuses:
1. `PENDING` - Initial status
2. `PROCESSING` - When user starts working
3. `DONE` - When completed

## Audit Logging

All actions are logged with:
- Actor (who performed the action)
- Action type (CREATE, UPDATE, DELETE, STATUS_CHANGE, ASSIGNMENT_CHANGE)
- Target entity and ID
- Relevant data (changes made)

## Testing

```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:cov
```

## Docker

```bash
# Build and run with Docker
docker-compose up --build
```
```

## Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

### With Docker

```bash
docker-compose up --build
```

## API Documentation

Once the application is running, visit `http://localhost:3000/api/docs` for Swagger documentation.

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in watch mode
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start production build
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests
- `npm run test:cov` - Run tests with coverage
- `npm run lint` - Lint the code
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── app.controller.ts          # Main app controller
├── app.module.ts              # Root module
├── app.service.ts             # Main app service
├── common/                    # Shared utilities
│   ├── constants/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── response/
│   └── types/
├── config/                    # Configuration files
├── modules/                   # Feature modules
│   ├── auth/                  # Authentication module
│   ├── prisma/                # Database module
│   └── user/                  # User management module
└── main.ts                    # Application entry point
```

## Authentication

The boilerplate includes:

- User registration and login with Passport.js Local Strategy
- JWT token-based authentication with Passport.js JWT Strategy
- Protected routes with Passport AuthGuards
- Role-based access control (RBAC)

### API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user (uses Passport Local Strategy)
- `GET /api/auth/me` - Get current user info (uses Passport JWT Strategy)
- `POST /api/auth/logout` - Logout (client-side)
- `GET /api/user/profile` - Get user profile (uses Passport JWT Strategy)
- `PUT /api/user/profile` - Update user profile (uses Passport JWT Strategy)

## Database

Uses Prisma with PostgreSQL. The schema includes a User model with authentication fields.

To modify the database schema:

1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Generate Prisma client: `npx prisma generate`

## Testing

```bash
# Run all tests
npm run test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:cov
```

## Deployment

### Docker Deployment

```bash
docker build -t nestjs-boilerplate .
docker run -p 3000:3000 nestjs-boilerplate
```

### Docker Compose (with PostgreSQL)

```bash
docker-compose up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
$ npm run test

# e2e tests

$ npm run test:e2e

# test coverage

$ npm run test:cov

````

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
````

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
