# ShopEase - Modern E-commerce Website

A responsive online shopping website built with React, using the Fake Store API. This project demonstrates modern front-end development practices with a focus on user experience and mobile-first design.

## Features

- **User Authentication**
  - Secure login with JWT authentication
  - Protected routes for authenticated users
  - Persistent session management

- **Product Management**
  - Browse all products with responsive grid layout
  - Filter products by category
  - Search functionality
  - Detailed product pages with images and descriptions

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Real-time price calculation
  - Checkout process with order confirmation

- **Responsive Design**
  - Mobile-first approach
  - Responsive grid layouts
  - Adaptive navigation
  - Touch-friendly interactions

## Tech Stack

- **Frontend Framework**: React.js (Vite)
- **Routing**: React Router v6+
- **State Management**: React Context API
- **API Integration**: Axios
- **Styling**: Plain CSS with mobile-first approach
- **API**: Fake Store API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd shopping-website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Login Credentials

For testing purposes, use the following credentials:
- Username: `mor_2314`
- Password: `83r5^_`

## Project Structure

```
shopping-website/
├── src/
│   ├── assets/          # CSS and static assets
│   ├── components/      # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── LoadingSpinner.jsx
│   ├── context/         # React context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   └── Login.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Static files
└── index.html           # HTML template
```

## Key Features Implementation

### Authentication
- JWT token-based authentication
- Protected routes for authenticated users
- Persistent login state using localStorage

### Product Management
- Responsive grid layout for product listing
- Category filtering
- Search functionality
- Detailed product pages

### Shopping Cart
- Add/remove items
- Quantity updates
- Real-time price calculation
- Order confirmation

### Responsive Design
- Mobile-first CSS approach
- Responsive grid layouts
- Adaptive navigation
- Touch-friendly interactions

## Deployment

This project can be deployed on platforms like Vercel or Netlify. The build process is configured in the `package.json` file.

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is created for educational purposes. Feel free to use and modify as needed.

## Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the product data
- Icons from [Feather Icons](https://feathericons.com/)
- Images from [Unsplash](https://unsplash.com/)
