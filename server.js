const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Импортируем cors

const app = express();
app.use(express.json());

// Используем CORS для всех маршрутов
app.use(cors());
const transporter = nodemailer.createTransport({
  host: "smtp.timeweb.ru",
  port: 465,
  secure: true,
  auth: {
    user: "admin@fermavkusov.ru", // Ваш email
    pass: "xxhg2_CIfZ", // Пароль к вашему email
  },
});

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  console.log(to, subject, text);

  const mailOptions = {
    from: "admin@fermavkusov.ru",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Ошибка при отправке письма");
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).send("Письмо успешно отправлено");
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
