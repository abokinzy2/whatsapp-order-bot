import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());

// بيانات حساب UltraMsg الخاصة بك
const INSTANCE_ID = "instance145936";
const TOKEN = "yydfsjgzyj84crtg";

// استقبال الطلبات (من الشيت أو من أي مصدر)
app.post("/send", async (req, res) => {
  try {
    const { phone, product, total } = req.body;

    const message = `مرحبًا 👋 تم استلام طلبك من M&H ✅
المنتج: ${product}
السعر الإجمالي: ${total} جنيه 💰
من فضلك اكتب كلمة *تم* لتأكيد الطلب حتى يتم الشحن في أقرب وقت 📦❤️`;

    const url = `https://api.ultramsg.com/${INSTANCE_ID}/messages/chat`;
    const payload = {
      token: TOKEN,
      to: phone,
      body: message,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("✅ تم الإرسال:", data);
    res.json({ success: true, data });
  } catch (error) {
    console.error("❌ خطأ:", error);
    res.status(500).json({ success: false, error });
  }
});

// لتجربة الصفحة
app.get("/", (req, res) => {
  res.send("✅ WhatsApp Order Bot يعمل بنجاح!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
