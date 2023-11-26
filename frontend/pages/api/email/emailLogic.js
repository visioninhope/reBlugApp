import 'dotenv/config';
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import { authOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { withAccelerate } from '@prisma/extension-accelerate';
import { randomUUID } from 'crypto';
import SendNewEmail from './newUser';

const saltRounds = 12;

const prisma = new PrismaClient().$extends(withAccelerate());

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { brandName, firstName, lastName, email, password, provider } = req.body;

      if (!email || !password || !firstName || !lastName) {
        console.error("Validation error: email is missing");
        return res.status(400).json({ message: "An entry is missing" });
      }

      const lowercaseEmail = email.toLowerCase();

      const existingUser = await prisma.user.findUnique({
        where: {
          email: lowercaseEmail,
        },
        cacheStrategy: { swr: 60, ttl: 60 },
      });

      // Check if User already exists
      if (existingUser) {
        // User already exists, log them in
        console.log("ExistingUser from emailLogic:", existingUser)
        return res.status(200).json({ user: existingUser, message: "User already exists, please login." });
      }



      // User doesn't exist, create a new account
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await prisma.user.create({
        data: {
          email: lowercaseEmail,
          password: hashedPassword,
          brandName,
          firstName,
          lastName,
          provider
        },
      });

      // Set the expiration date and time, e.g., 1 hour from now
      const expires = new Date();
      expires.setHours(expires.getHours() + 1);

      const token = await prisma.verificationToken.create({
        data: {
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
          userId: newUser.id,
          expires: expires,
        }
      });

      if (token) {
        // Send email here (assuming SendNewEmail is properly implemented)
        await SendNewEmail({ firstName, email, token: token.token, userId: token.userId });
      }


      // Send any additional information you want to the client
      return res.status(201).json({ user: newUser, message: "User created successfully Please check your email to proceed.", redirect: "/api/auth/signin" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: `An error occurred during registration: ${error}` });
    } finally {
      await prisma.$disconnect();
    }
  }
  return res.status(405).end();
}