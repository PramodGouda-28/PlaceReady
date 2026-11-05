
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const webpush = require("web-push");

const app = express();

app.use(cors());
app.use(express.json());

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

// Send public VAPID key to frontend
app.get("/api/vapid-public-key", (req, res) => {
    res.json({
        publicKey: process.env.VAPID_PUBLIC_KEY
    });
});

// Test backend
app.get("/", (req, res) => {
    res.send("PlaceReady Push Notification Server is running!");
});
// Send public VAPID key to frontend
app.get("/api/vapid-public-key", (req, res) => {
    res.json({
        publicKey: process.env.VAPID_PUBLIC_KEY
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Send a test push notification
app.post("/api/send-test", async (req, res) => {
    const subscription = req.body;

    try {
        await webpush.sendNotification(
            subscription,
            JSON.stringify({
                title: "PlaceReady",
                body: "Push notifications are working!"
            })
        );

        res.json({ message: "Notification sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Notification failed" });
    }
});