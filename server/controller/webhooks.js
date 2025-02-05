import { Webhook } from 'svix';
import User from '../models/User.js';

// API controller function to manage Clerk user with database
export const clerkwebhooks = async (req, res) => {
    try {
        // Create a Svix instance with Clerk webhook secret
        const whook = new webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify headers
        try {
            await whook.verify(JSON.stringify(req.body), {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            });
        } catch (err) {
            console.error("Webhook verification failed:", err.message);
            return res.status(400).json({ success: false, message: "Webhook verification failed" });
        }

        // Get data from request body
        const { data, type } = req.body;

        // Handle different event types
        switch (type) {
            case 'user.created': {
                const email = data.email_addresses.length > 0 ? data.email_addresses[0].email_address : '';
                const userData = {
                    _id: data.id,
                    email: email,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                };
                await User.create(userData);
                res.json({});
                break;
            }
            case 'user.updated': {
                const email = data.email_addresses.length > 0 ? data.email_addresses[0].email_address : '';
                const updateData = {
                    email: email,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url
                };
                await User.findByIdAndUpdate(data.id, { $set: updateData });
                res.json({});
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({});
                break;
            }
            default:
                break;
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Webhooks Error', error: error.message });
    }
};

export default clerkwebhooks;