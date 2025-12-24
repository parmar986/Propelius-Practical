# React Native Product Listing App

This is a React Native mobile application built as part of a practical assignment.
The app displays a list of products using the FakeStore API and supports search,
pagination, product details, and a cart count.

---

## 🚀 Features

- Product listing screen
- Product detail screen
- Search products by name or category
- Frontend pagination (10 products per load)
- Cart count badge
- API integration using Axios
- Clean and modular code structure
- TypeScript support

---

## 🧱 Tech Stack

- React Native (CLI)
- TypeScript
- Axios
- React Navigation
- Context API (for cart state)

---

## 🔗 API Used

FakeStore API  
https://fakestoreapi.com/products

---

## 📱 Screens

1. Product List Screen
   - Displays products in grid format
   - Search by product name or category
   - Pagination on scroll

2. Product Detail Screen
   - Product image, price, description
   - Add to cart functionality

---

## 🛠️ Setup Instructions

```bash
git clone <repository-url>
cd <project-folder>
npm install
npx pod-install ios
npx react-native run-android
# or
npx react-native run-ios
