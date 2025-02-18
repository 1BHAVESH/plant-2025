import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
       default: Date.now
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plant',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
});

export const Order = mongoose.model('Order', orderSchema);

