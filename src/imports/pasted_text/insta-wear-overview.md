# InstaWear 👕⚡

### Hyperlocal Fashion Quick-Commerce Platform

A scalable **hyperlocal fashion delivery platform** inspired by instant commerce and fashion ecosystems, combining **nearby clothing stores + owned discounted inventory** to deliver fashion products quickly.

Inspired by:

* Instamart
* Myntra
* Zomato

---

# 🚀 Overview

**InstaWear** is a hybrid fashion quick-commerce platform that enables users to discover nearby fashion products and receive **same-day or instant delivery**.

Unlike traditional fashion platforms where delivery takes several days, InstaWear focuses on:

* Hyperlocal fashion discovery
* Fast delivery
* Real-time inventory visibility
* Discounted branded overstock products
* Smart recommendations

---

# ❌ Problem Statement

Fashion e-commerce suffers from multiple problems:

* Nearby stores are not digitally searchable
* Inventory visibility is poor
* Online fashion delivery takes days
* Local shops struggle with unsold inventory
* Branded overstock inventory often remains unused

---

# ✅ Solution

InstaWear solves this through a **Hybrid Inventory Model**:

```text
70% → Nearby Local Store Inventory
30% → InstaWear-Owned Overstock Inventory
```

Users can:

✔ Discover nearby fashion stores
✔ Browse clothing instantly
✔ Order products with same-day delivery
✔ Access discounted branded inventory
✔ Get personalized recommendations

---

# 🏗️ Business Model

## Hybrid Inventory System

### 1. Local Store Inventory (70%)

Products are sourced from nearby stores.

```text
Store → Product Upload → User Purchase → Delivery
```

Supported stores:

* Boutiques
* Clothing shops
* Footwear stores
* Fashion retailers

### 2. InstaWear Overstock Inventory (30%)

InstaWear purchases:

* Unsold inventory
* Clearance stock
* Seasonal leftovers
* Excess branded stock

Stored inside:

* Micro warehouses
* Dark stores

Example Profit Model:

```text
Purchase Price = ₹250
Selling Price = ₹399

Profit = ₹149
```

---

# 🚚 Delivery Model

InstaWear follows a **Hybrid Delivery Architecture**.

## A. InstaWear Riders (< 5 km)

For short-distance deliveries:

```text
Warehouse / Store
        ↓
InstaWear Rider
        ↓
Customer
```

Benefits:

* Faster delivery
* Better tracking
* Lower delivery cost

## B. Third-Party Logistics (> 5 km)

For long-distance or overflow deliveries:

```text
External Logistics APIs
Courier Integration
```

---

# 🏛️ System Architecture

```text
                    USER APP
                        |
        ---------------------------------
        |                               |
   API Gateway                    Authentication
        |
 ----------------------------------------------------------------
 | User Service        | Product Service     | Store Service     |
 | Cart Service        | Order Service       | Delivery Service  |
 | Payment Service     | Warehouse Service   | Search Service    |
 | Recommendation      | Coupon Service      | Notification      |
 ----------------------------------------------------------------
                        |
                 Database Layer
                        |
 ------------------------------------------------------
 | User DB | Product DB | Inventory DB | Order DB     |
 ------------------------------------------------------
```

---

# ✨ Features

## Customer App

* Login / Signup
* Nearby fashion stores
* Product browsing
* Search & filtering
* Cart management
* Secure payments
* Real-time tracking
* Wishlist
* Ratings & reviews
* Returns & exchange

## Store Partner Panel

* Product upload
* Inventory updates
* Order acceptance/rejection
* Sales dashboard

## Warehouse Module

* Overstock management
* Inventory reservation
* Bulk storage
* Fast-moving inventory handling

## Delivery Partner Module

* Order assignment
* Navigation support
* Delivery status updates
* Earnings tracking

## Admin Panel

* Store management
* Inventory control
* Analytics dashboard
* Fraud monitoring
* Complaint management

---

# 🔄 High-Level User Flow

```text
User opens app
      ↓
Location detected
      ↓
Nearby stores fetched
      ↓
Search products
      ↓
Add to cart
      ↓
Inventory reserved
      ↓
Order placed
      ↓
Payment completed
      ↓
Delivery assigned
      ↓
Track order
      ↓
Delivered
```

---

# 🗂️ Database Design

## User Table

| Field    | Type   |
| -------- | ------ |
| user_id  | int    |
| name     | string |
| email    | string |
| phone    | string |
| password | string |

---

## Store Table

| Field      | Type   |
| ---------- | ------ |
| store_id   | int    |
| store_name | string |
| location   | string |
| rating     | float  |

---

## Product Table

| Field      | Type   |
| ---------- | ------ |
| product_id | int    |
| name       | string |
| category   | string |
| brand      | string |
| size       | string |
| color      | string |
| price      | double |
| stock      | int    |

---

## Order Table

| Field          | Type   |
| -------------- | ------ |
| order_id       | int    |
| user_id        | int    |
| total_amount   | double |
| status         | string |
| payment_status | string |

---

## Delivery Table

| Field       | Type   |
| ----------- | ------ |
| delivery_id | int    |
| partner_id  | int    |
| order_id    | int    |
| status      | string |

---

## Review Table

| Field      | Type   |
| ---------- | ------ |
| review_id  | int    |
| user_id    | int    |
| product_id | int    |
| rating     | int    |
| comment    | string |

---

# 🧠 Low-Level Design (LLD)

Core modules include:

* User
* Store
* Product
* Cart
* Order
* Warehouse
* Delivery Partner

Concepts implemented:

* Object-Oriented Programming (OOP)
* Encapsulation
* Inheritance
* Service-based architecture
* Inventory reservation system
* Order lifecycle management

---

# 📦 Inventory Management

## Store Inventory

```text
Product available at local shop
          ↓
Store confirms order
          ↓
Delivery assigned
```

## Warehouse Inventory

```text
Bulk overstock inventory
          ↓
Stored in micro warehouse
          ↓
Fast delivery
```

## Reservation Logic

```text
Available Stock = 10

User buys = 2

Available = 8
Reserved = 2
```

Reservation Timeout:

```text
5 minutes
```

---

# 🔍 Search Engine Design

### Filters Supported

* Category
* Brand
* Price
* Color
* Size
* Rating
* Distance

### Data Structure Used

```cpp
unordered_map<string, vector<Product>>
```

### Optional Trie Search

Example:

Input:

```text
hoo
```

Suggestions:

```text
hoodie
hooded jacket
```

---

# 🤖 Recommendation Engine

Recommendations are generated using:

* Purchase history
* Trending nearby products
* Recently viewed items
* Popular products

Example:

```text
Bought Jeans
      ↓
Recommend Hoodie
```

---

# 📦 Order Lifecycle

```text
Order Placed
      ↓
Inventory Reserved
      ↓
Store/Warehouse Confirmation
      ↓
Payment Success
      ↓
Delivery Assigned
      ↓
Out For Delivery
      ↓
Delivered
```

---

# 💳 Payment System

Supported methods:

* UPI
* Card
* Cash on Delivery (COD)

Implemented using **Strategy Pattern**.

```cpp
class PaymentStrategy {
public:
    virtual void pay() = 0;
};
```

---

# 🔁 Returns & Exchange

## Return Flow

```text
User requests return
      ↓
Quality verification
      ↓
Pickup scheduled
      ↓
Refund initiated
```

## Exchange Flow

```text
Wrong size
      ↓
Exchange request
      ↓
Replacement delivered
```

---

# 🔔 Notifications

Examples:

* Order confirmed
* Payment successful
* Delivery arriving
* Return approved

Uses **Observer Pattern**.

```text
Order Updated
      ↓
Notify User
Notify Store
Notify Delivery Partner
```

---

# 🎁 Coupons & Offers

Example coupons:

```text
NEWUSER50
FLAT100
FREESHIP
```

---

# 🧩 Design Patterns Used

| Pattern   | Purpose          |
| --------- | ---------------- |
| Strategy  | Payment methods  |
| Observer  | Notifications    |
| Singleton | Database manager |
| Factory   | Product creation |
| State     | Order lifecycle  |

---

# 💰 Revenue Model

### 1. Product Margin

```text
Buy @ ₹250
Sell @ ₹399
```

### 2. Store Commission

```text
5–15% commission per order
```

### 3. Delivery Charges

```text
₹29–₹59
```

### 4. Sponsored Listings

Stores can pay for visibility.

---

# ⚠️ Risks & Mitigation

| Risk           | Mitigation          |
| -------------- | ------------------- |
| Stock mismatch | Reservation system  |
| Dead inventory | Demand prediction   |
| Delivery delay | Hybrid logistics    |
| Fake products  | Store verification  |
| Return abuse   | Verification system |

---

# 📁 Project Structure

```text
InstaWear/

├── models/
│   ├── User.cpp
│   ├── Product.cpp
│   ├── Store.cpp
│   ├── Order.cpp
│   └── Warehouse.cpp
│
├── services/
│   ├── OrderService.cpp
│   ├── PaymentService.cpp
│   ├── DeliveryService.cpp
│   ├── SearchService.cpp
│   └── RecommendationService.cpp
│
├── database/
│   └── DBManager.cpp
│
├── utils/
│   └── Logger.cpp
│
└── main.cpp
```

---

# 📈 Future Improvements

* AI-powered recommendations
* Virtual try-on system
* Dynamic pricing
* Warehouse automation
* Demand forecasting
* Multilingual support

---

# 🧑‍💻 Tech Concepts Used

* C++
* Object-Oriented Programming
* System Design
* Low-Level Design (LLD)
* Data Structures
* Inventory Management
* Recommendation Systems
* Search Optimization
* Design Patterns

---

# 📌 Resume Description

> Built InstaWear, a hyperlocal fashion quick-commerce platform using a hybrid inventory model combining nearby local stores and owned overstock inventory. Designed scalable low-level architecture in C++ with inventory reservation, hybrid delivery routing, recommendation systems, search optimization, order lifecycle management, returns handling, and OOP-based modular design.

---

# ⭐ Why This Project?

✅ Real-world startup idea
✅ Strong system design project
✅ OOP + LLD concepts
✅ Resume-ready architecture project
✅ Scalable commerce design
✅ Interview-friendly explanation

---

**Made with ❤️ for scalable fashion commerce**
