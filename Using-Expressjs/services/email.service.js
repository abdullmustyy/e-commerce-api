import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { __dirname } from "../utils/path.js";

const email = process.env.EMAIL;
const appPassword = process.env.APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: appPassword,
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: email,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
  return;
};

export const renderEmailTemplate = (templateName, data) => {
  const templatePath = path.join(
    __dirname,
    "..",
    "views",
    "emails",
    `${templateName}.ejs`
  );

  return ejs.renderFile(templatePath, data, (err, html) => {
    if (err) {
      console.log("Error while rendering email template: \n", err);
    } else {
      sendEmail(data.email, data.subject, html);
    }
  });
};
