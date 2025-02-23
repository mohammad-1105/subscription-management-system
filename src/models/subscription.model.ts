// subscriptionSchema.ts
import mongoose, { Document } from "mongoose";
import {
  Currency,
  Frequency,
  Category,
  PaymentMethod,
  Status,
  RenewalPeriods,
} from "./../constants/enums";

export interface ISubscription extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
  currency: Currency;
  frequency: Frequency;
  category: Category;
  paymentMethod: PaymentMethod;
  status: Status;
  startDate: Date;
  renewalDate: Date;
  user: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const subscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      minlength: [3, "Subscription name must be at least 3 characters"],
      maxlength: [100, "Subscription name must be at most 100 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: Object.values(Currency),
      default: Currency.USD,
    },
    frequency: {
      type: String,
      enum: Object.values(Frequency),
      required: [true, "Subscription frequency is required"],
    },
    category: {
      type: String,
      enum: Object.values(Category),
      required: [true, "Subscription category is required"],
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: [true, "Subscription payment method is required"],
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.Active,
    },
    startDate: {
      type: Date,
      required: [true, "Subscription start date is required"],
      validate: {
        validator: function (value: Date) {
          return value <= new Date();
        },
        message: "Start date must be in the past or present",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          return value > (this as ISubscription).startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Subscription user is required"],
      index: true,
    },
  },
  { timestamps: true }
);

// Auto calculate renewal date
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = Object(RenewalPeriods);

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Auto update the status if the renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = Status.Expired;
  }

  // Call the next middleware
  next();
});

export const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
