// enums.ts

// Currency Enum: Includes a comprehensive list of ISO 4217 currency codes. Learn about ISO 4217 here: https://en.wikipedia.org/wiki/ISO_4217
export enum Currency {
  USD = "USD", // United States Dollar
  EUR = "EUR", // Euro
  GBP = "GBP", // British Pound
  JPY = "JPY", // Japanese Yen
  AUD = "AUD", // Australian Dollar
  CAD = "CAD", // Canadian Dollar
  CHF = "CHF", // Swiss Franc
  CNY = "CNY", // Chinese Yuan
  SEK = "SEK", // Swedish Krona
  NZD = "NZD", // New Zealand Dollar
  INR = "INR", // Indian Rupee
  BRL = "BRL", // Brazilian Real
  RUB = "RUB", // Russian Ruble
  ZAR = "ZAR", // South African Rand
  MXN = "MXN", // Mexican Peso
  SGD = "SGD", // Singapore Dollar
  HKD = "HKD", // Hong Kong Dollar
  KRW = "KRW", // South Korean Won
  TRY = "TRY", // Turkish Lira
  NOK = "NOK", // Norwegian Krone
  AED = "AED", // United Arab Emirates Dirham
  ARS = "ARS", // Argentine Peso
  DKK = "DKK", // Danish Krone
  ILS = "ILS", // Israeli New Shekel
  PLN = "PLN", // Polish Zloty
  THB = "THB", // Thai Baht
  MYR = "MYR", // Malaysian Ringgit
  IDR = "IDR", // Indonesian Rupiah
  PHP = "PHP", // Philippine Peso
  COP = "COP", // Colombian Peso
  PEN = "PEN", // Peruvian Sol
  CLP = "CLP", // Chilean Peso
  HUF = "HUF", // Hungarian Forint
  CZK = "CZK", // Czech Koruna
  RON = "RON", // Romanian Leu
  VND = "VND", // Vietnamese Dong
  SAR = "SAR", // Saudi Riyal
  QAR = "QAR", // Qatari Riyal
  KWD = "KWD", // Kuwaiti Dinar
  BHD = "BHD", // Bahraini Dinar
  OMR = "OMR", // Omani Rial
  EGP = "EGP", // Egyptian Pound
}

// Frequency Enum: Covers common subscription intervals
export enum Frequency {
  Daily = "Daily",
  Weekly = "Weekly",
  BiWeekly = "BiWeekly", // Every two weeks
  Monthly = "Monthly",
  Quarterly = "Quarterly", // Every three months
  SemiAnnually = "SemiAnnually", // Every six months
  Yearly = "Yearly",
  Biennially = "Biennially", // Every two years
}

// Renewal Periods Enum: Covers common renewal periods
export enum RenewalPeriods {
  Daily = 1,
  Weekly = 7,
  BiWeekly = 14,
  Monthly = 30,
  Quarterly = 90,
  SemiAnnually = 180,
  Yearly = 365,
  Biennially = 730,
}

// Category Enum: Broad range of subscription categories
export enum Category {
  Sports = "sports",
  News = "news",
  Entertainment = "entertainment",
  Lifestyle = "lifestyle",
  Technology = "technology",
  Finance = "finance",
  Politics = "politics",
  Health = "health",
  Education = "education",
  Gaming = "gaming",
  Music = "music",
  Travel = "travel",
  Fashion = "fashion",
  Food = "food",
  Business = "business",
  Science = "science",
  Other = "other",
}

// Payment Method Enum: Comprehensive payment options
export enum PaymentMethod {
  CreditCard = "Credit Card",
  DebitCard = "Debit Card",
  PayPal = "PayPal",
  BankTransfer = "Bank Transfer",
  ApplePay = "Apple Pay",
  GooglePay = "Google Pay",
  Cryptocurrency = "Cryptocurrency",
  Cash = "Cash",
  Check = "Check",
  MobilePayment = "Mobile Payment",
  Other = "Other",
}

// Status Enum: Common subscription statuses
export enum Status {
  Active = "active",
  Expired = "expired",
  Cancelled = "cancelled",
  Pending = "pending",
  Suspended = "suspended",
  Trial = "trial",
}
