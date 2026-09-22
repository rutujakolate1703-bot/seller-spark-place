export type Role = "SELLER" | "BUYER" | "ADMIN";

export type ProductStatus =
  | "PENDING_PAYMENT"
  | "PAYMENT_SUCCESS"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "CHANGES_REQUIRED"
  | "ACTIVE"
  | "OUT_OF_STOCK"
  | "UNAVAILABLE";

export type OrderStatus =
  | "NEW"
  | "CONFIRMED"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type SellerStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED";

export type PaymentStatus = "PENDING" | "SUCCESSFUL" | "FAILED" | "REFUNDED";

export type ReportStatus = "OPEN" | "INVESTIGATING" | "RESOLVED" | "CLOSED";

export interface User {
  id: string;
  role: Role;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  createdAt: string;
}

export interface Seller {
  id: string;
  userId: string;
  storeName: string;
  businessType: string;
  businessCategory: string;
  location: string;
  description: string;
  yearsInBusiness: string;
  productCategory: string;
  productCount: string;
  instagram: string;
  whatsapp: string;
  otherLinks: string;
  status: SellerStatus;
  verified: boolean;
  rating: number;
  joinedAt: string;
  sells: string[];
  sellsNow: string[];
  wantsToSell: string;
  guidanceDone: string[];
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  mrp?: number;
  stock: number;
  size: string;
  colour: string;
  variants: string;
  weight: string;
  delivery: string;
  availability: string;
  image: string;
  status: ProductStatus;
  views: number;
  registrationFee: number;
  registeredAt: string;
  adminNote?: string;
  tags: string[];
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  sellerId: string;
}

export interface Address {
  fullName: string;
  mobile: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  items: OrderItem[];
  amount: number;
  delivery: number;
  status: OrderStatus;
  paymentMethod: string;
  address: Address;
  placedAt: string;
  reviewed?: boolean;
}

export interface RegistrationPayment {
  id: string;
  productId: string;
  sellerId: string;
  amount: number;
  status: PaymentStatus;
  paidAt: string;
  transactionId: string;
}

export interface Review {
  id: string;
  productId: string;
  sellerId: string;
  buyerId: string;
  buyerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  reported?: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  tone: "success" | "warning" | "info" | "danger";
  createdAt: string;
  read: boolean;
}

export interface Report {
  id: string;
  raisedBy: string;
  raisedByName: string;
  role: Role;
  type: string;
  subject: string;
  details: string;
  status: ReportStatus;
  resolution?: string;
  createdAt: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface GuidanceAnswers {
  sells: string;
  location: string;
  businessType: string;
  channels: string;
  turnover: string;
}
