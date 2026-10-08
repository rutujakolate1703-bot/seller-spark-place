# HomeHub Marketplace

Create a modern, professional, responsive web application called HomeHub.

PROJECT OVERVIEW

HomeHub is a digital marketplace and business-enablement platform for small-scale, home-based, and local sellers.

Many small sellers currently sell products through WhatsApp, Instagram, Facebook, or local customers. They have limited reach and often do not have a proper digital storefront or centralized system for managing products and orders.

HomeHub allows these sellers to register their products ONCE on the platform, pay a ONE-TIME product registration/listing fee, get their product reviewed by the HomeHub Admin, and then make the approved product available to buyers through their HomeHub store.

The same registered product must NOT require re-registration every time it is sold.

HomeHub also provides sellers with a guided pathway containing information about potentially applicable business registrations, licences, documents, and official government resources.

IMPORTANT:
The business-registration/licence section is an informational guidance system. Do not claim that a particular licence is legally required unless the requirement is verified. Show applicable guidance based on business type/product/location and link to official government resources.

USER ROLES

Create three separate roles:

SELLER

BUYER

ADMIN

Each role must have a separate dashboard and permissions.

1. LANDING PAGE

Create a professional HomeHub landing page.

Header:

HomeHub logo

Home

Explore Products

For Sellers

Business Guidance

About

Login

Register

Hero section:

Headline:

"Bring Your Local Business to the Digital Marketplace"

Subheading:

"HomeHub helps small and home-based businesses reach more customers, create their own digital store, and manage products and orders in one place."

Buttons:

"Start Selling"

"Explore Products"

Show an illustration/visual representing:

Small Seller → HomeHub → Wider Customers

2. HOW HOMEHUB WORKS

Create a simple 4-step section.

For Sellers:

Create Seller Account

Register Products

Pay One-Time Registration Fee

Get Approved and Start Selling

For Buyers:

Discover Products

View Seller & Product

Add to Cart

Place Order

3. SELLER REGISTRATION

Create a multi-step seller registration form.

Step 1: Personal Information

Full name

Mobile number

Email

Password

Step 2: Business Information

Business/shop name

Business type

Business category

Business location

Description

Years in business

Step 3: Selling Information

Product category

Number of products

Instagram link

WhatsApp/business contact

Other social media links

Step 4: Business Guidance

Ask:

"What type of products do you sell?"

Options:

Food

Clothing

Handmade products

Jewellery

Beauty products

Home decor

Plants

Other

Ask:

"Where do you currently sell?"

WhatsApp

Instagram

Facebook

Local store

Other

Ask:

"Where do you want to sell?"

Local area

Within state

Across India

After submission, create the seller account and redirect to the Seller Dashboard.

4. SELLER DASHBOARD

Create a professional dashboard.

Show:

Total Products

Active Products

Pending Products

Total Orders

Revenue

Product Views

Pending Actions

Dashboard cards:

"Register New Product"
"Manage Products"
"Manage Orders"
"My Store"
"Business Guidance"
"Analytics"

Include a notification area.

Example:

"Your product Handmade Candle has been approved."

"Your new product is waiting for admin review."

5. PRODUCT REGISTRATION

This is a CORE FEATURE.

Create a "Register Product" page.

Seller enters:

Product name

Product images

Product description

Category

Price

Stock quantity

Size

Colour

Variants

Weight

Delivery information

Product availability

Show this important message:

"Register your product once. After approval, you do not need to register it again for every sale."

After filling the form:

Button:

"Continue to Registration Fee"

6. ONE-TIME PRODUCT REGISTRATION FEE

Create a payment/fee page.

Show:

Product:
"Handmade Lavender Candle"

Registration Type:
"One-Time Product Registration"

Fee:
"₹XX"

Message:

"This is a one-time registration/listing fee for this product. The product does not need to be registered again for every order."

Button:

"Pay & Submit for Review"

For the prototype, use a simulated payment system.

Do NOT implement a real payment gateway unless specifically requested.

After successful simulated payment:

Status = "Pending Admin Approval"

7. PRODUCT APPROVAL FLOW

After seller submits the product:

Seller sees:

"Product Submitted Successfully"

Status:

🟡 Pending Review

Admin reviews the product.

Admin can:

Approve

Reject

Request Changes

If approved:

🟢 Approved

The product becomes publicly visible on HomeHub.

If rejected:

🔴 Rejected

Show rejection reason.

If changes requested:

🟠 Changes Required

Seller can edit and resubmit.

8. IMPORTANT PRODUCT REGISTRATION RULE

Implement this business logic clearly:

A product is registered only once.

Example:

Seller registers:

"Handmade Candle"

Pays one-time registration fee.

Admin approves it.

Product becomes ACTIVE.

If buyer purchases:

1 unit
10 units
100 units

The seller does NOT register the product again.

The seller only updates:

Stock

Price

Product information if necessary

Availability

If seller adds a completely NEW product, that new product follows the registration process.

9. MY STORE

Create a public seller storefront.

Example:

"Rutuja Handmade Crafts"

Show:

Seller profile

Business description

Location

Verification status where applicable

Products

Ratings

Reviews

Social media links

Products displayed as cards.

Each card:

Product image

Product name

Price

Rating

Stock status

View Product

Add:

"Share Store"

Generate a shareable HomeHub store link and QR-code placeholder.

The seller should be able to share the store through WhatsApp and Instagram.

10. MANAGE PRODUCTS

Seller can see:

Active

Pending

Rejected

Out of Stock

Product table/card:

Product | Price | Stock | Status | Actions

Actions:

View

Edit

Update Stock

Mark Unavailable

Remove

Do not allow sellers to bypass admin approval when a change requires re-review.

11. SELLER ORDER MANAGEMENT

Create:

"Orders"

Tabs:

New

Confirmed

Packed

Shipped

Delivered

Cancelled

Order card:

Order ID
Buyer
Product
Quantity
Amount
Date
Status

Seller can update order status.

Flow:

New Order
→ Confirm
→ Pack
→ Ship
→ Delivered

12. BUYER HOME PAGE

Create a marketplace homepage.

Header:

HomeHub logo
Search bar
Categories
Wishlist
Cart
Orders
Profile

Hero:

"Discover Products from Small Businesses"

Sections:

Trending Products

New Sellers

Popular Products

Local Businesses

Categories

Recommended Products

13. PRODUCT SEARCH

Create powerful search and filtering.

Search by:

Product name

Category

Seller

Filters:

Price

Category

Location

Rating

Availability

Sort:

Relevance

Price low to high

Price high to low

Newest

Popular

14. PRODUCT DETAILS

Show:

Product images

Product name

Price

Discount if available

Description

Seller

Seller location

Rating

Reviews

Stock

Available variants

Delivery information

Buttons:

"Add to Cart"
"Buy Now"
"Wishlist"

Show:

"View Seller Store"

15. CART

Show:

Product
Quantity
Price
Subtotal
Delivery
Total

Buttons:

"Continue Shopping"
"Proceed to Checkout"

16. CHECKOUT

Create:

Step 1:
Delivery Address

Step 2:
Order Summary

Step 3:
Payment

For prototype, provide simulated payment options:

UPI

Card

Cash on Delivery

Do not connect real payment processing yet.

After successful simulated payment:

"Order Placed Successfully"

Generate Order ID.

17. BUYER ORDER TRACKING

Create order tracking:

✓ Order Placed
↓
✓ Confirmed
↓
✓ Packed
↓
🚚 Shipped
↓
🏠 Delivered

Buyer can view:

Order ID

Product

Seller

Amount

Date

Current status

18. REVIEWS & RATINGS

After delivery, buyer can:

Give 1–5 star rating

Write review

Show reviews on product and seller pages.

Admin should be able to review reported reviews.

19. BUSINESS GUIDANCE

Create a dedicated section:

"Business Guidance"

Purpose:

Help small sellers understand potentially applicable business registrations, licences, documents, and official processes.

Create a guided questionnaire.

Ask:

What do you sell?

Where is your business located?

What type of business do you operate?

Where do you sell?

Approximate business scale/turnover range where relevant.

Then show a personalized information checklist.

Example:

"Your Business Guidance"

✓ Basic business information
○ Registration information
○ Tax/GST information
○ Product-specific requirements
○ Local permissions
○ Other applicable requirements

For each item show:

What is it?

Who may need it?

Why it may matter

General documents/information

General process

Official government resource

Always include:

"Requirements may vary depending on your business, product, location and other circumstances. Verify current requirements through the relevant official government authority."

20. BUSINESS GUIDANCE PROGRESS

Show a progress tracker:

Business Setup Progress

████████░░ 80%

Completed:
✓ Seller profile
✓ Business information

Pending:
○ Review applicable registration
○ Review product-specific requirements

Add "View Official Resources" buttons.

21. ADMIN DASHBOARD

Create a powerful Admin Dashboard.

Admin is the HomeHub platform operator.

Dashboard cards:

Total Sellers
Total Buyers
Total Products
Active Products
Pending Products
Total Orders
Pending Reports
Registration Revenue

Charts:

Seller registrations over time

Product registrations over time

Orders

Revenue

Product categories

Active sellers

22. ADMIN SELLER MANAGEMENT

Admin can:

View sellers

Search sellers

Filter sellers

View seller profile

Approve seller

Reject seller

Suspend seller

View seller products

View payment history

Seller status:

Pending

Active

Suspended

Rejected

23. ADMIN PRODUCT MANAGEMENT

Admin can see:

Pending products

Approved products

Rejected products

Reported products

For each product:

Seller

Product name

Category

Price

Registration payment

Date

Status

Actions:

Approve
Reject
Request Changes
Remove

24. ADMIN PAYMENT MANAGEMENT

Admin can see:

Seller

Product

Registration fee

Payment status

Payment date

Transaction ID

Statuses:

Pending

Successful

Failed

Refunded

Dashboard:

Total Registration Revenue

This revenue represents the one-time product registration/listing fees.

25. ADMIN ORDER MANAGEMENT

Admin can monitor:

Order ID

Buyer

Seller

Product

Amount

Order status

Date

Admin should be able to view orders and handle platform-level issues.

26. ADMIN REPORT MANAGEMENT

Create:

"Reports & Complaints"

Buyer can report:

Product issue

Seller issue

Misleading information

Order issue

Seller can report:

Buyer issue

Payment issue

Platform issue

Admin can:

View report

Investigate

Change status

Add resolution

Close report

27. AI FEATURES

Create placeholders/interfaces for future AI functionality.

AI Product Description

Seller enters basic product information.

AI generates:

Product title

Product description

Tags

Category suggestion

Seller must be able to edit the generated content before publishing.

AI Business Assistant

Create a chat interface:

"Ask HomeHub"

Example questions:

"What should I check before selling homemade food online?"

"How can I improve my product listing?"

"How should I describe my handmade product?"

The AI should provide guidance and direct the seller to relevant official resources.

Do not present legal guidance as guaranteed legal advice.

Product Recommendation

Buyer receives recommendations based on browsing, wishlist, purchases, or similar products.

28. NOTIFICATIONS

Create notifications for:

Seller:

Product approved

Product rejected

Product changes requested

New order

Payment successful

Low stock

Buyer:

Order confirmed

Order shipped

Order delivered

Review reminder

Admin:

New seller

New product

New payment

New report

29. DATABASE STRUCTURE

Create a proper relational database structure.

Main entities:

Users
Sellers
Buyers
Businesses
Products
ProductImages
Categories
ProductRegistrations
RegistrationPayments
Orders
OrderItems
Addresses
Reviews
Wishlists
Notifications
Reports
BusinessGuidance
GuidanceResources

Important relationship:

One Seller → Many Products

One Product → One initial Product Registration

One Product → Many Orders

One Buyer → Many Orders

One Seller → Many Orders

One Product → Many Reviews

One Seller → One Store

30. PRODUCT STATUS

Use:

PENDING_PAYMENT
PAYMENT_SUCCESS
PENDING_REVIEW
APPROVED
REJECTED
CHANGES_REQUIRED
ACTIVE
OUT_OF_STOCK
UNAVAILABLE

31. DESIGN STYLE

Use a clean, modern, trustworthy marketplace design.

Design characteristics:

Professional

Simple

Friendly

Easy for non-technical small business owners

Mobile responsive

Desktop responsive

Clean cards

Rounded corners

Good spacing

Clear typography

Strong visual hierarchy

Use a warm, modern marketplace visual identity.

Do not make the interface look like Amazon or Flipkart.

HomeHub should feel like a platform specifically designed for small and local businesses.

32. IMPORTANT UX REQUIREMENTS

The seller may not be technically experienced.

Therefore:

Use simple language

Use step-by-step forms

Add progress indicators

Explain why information is required

Show clear success/error messages

Avoid complicated dashboards

Use tooltips/help text

Make actions obvious

Example:

Instead of:

"Submit Listing"

Use:

"Register Product & Continue"

Instead of:

"Compliance"

Use:

"Business Registration & Licence Guidance"

33. DEMO DATA

Create realistic demo data.

Example sellers:

Rutuja Handmade Crafts

Pune Home Bakery

Local Threads Boutique

EcoPlant Studio

Handmade Gift Corner

Example products:

Handmade Candle

Gift Box

Cotton Kurti

Decorative Plant

Handmade Jewellery

Chocolate Box

Create enough data to demonstrate search, filtering, dashboards, orders and admin management.

34. END-TO-END DEMO FLOW

The application must support this complete demonstration:

SELLER:

Register
→ Create Business Profile
→ Register Product
→ Pay One-Time Registration Fee
→ Submit Product
→ Wait for Admin Approval

ADMIN:

Login
→ See Pending Product
→ Review Product
→ Approve Product

SELLER:

See "Product Approved"
→ Product appears in My Store

BUYER:

Login
→ Search Product
→ View Product
→ View Seller
→ Add to Cart
→ Checkout
→ Place Order

SELLER:

See New Order
→ Confirm
→ Pack
→ Ship
→ Mark Delivered

BUYER:

See Order Tracking
→ Receive Product
→ Give Rating & Review

35. MOST IMPORTANT BUSINESS RULE

Implement this clearly throughout the UI:

ONE-TIME PRODUCT REGISTRATION

"Once a product has been successfully registered and approved on HomeHub, the seller does not need to register or pay the product registration fee again for every order."

If the seller adds a NEW product, that new product follows the product-registration process.

36. FINAL HOMEHUB VALUE PROPOSITION

HomeHub should communicate:

"For Sellers:
Register once. Get discovered. Sell to more customers."

"For Buyers:
Discover products from small and local businesses."

"For Small Businesses:
Move beyond WhatsApp and Instagram with your own digital storefront."

Build the application with realistic navigation, working frontend interactions, role-based dashboards, product registration workflow, simulated one-time payment workflow, admin approval workflow, buyer shopping flow, order management, business guidance flow, and responsive UI.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://seller-spark-place.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/94ef695e-6c95-4671-9144-3953a9eeb8d8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
