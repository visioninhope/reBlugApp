import { Html } from "@react-email/html";
import { Body } from "@react-email/body";
import Link from 'next/link'

export default function Email({ firstName, token }) {
  const verificationLink = `https://forgedmart.com/api/verify/${token}`;

  return (
    <Html>
      <Body>
        <p>Hello {firstName},</p>
        <p>Hope this email finds you well.</p>
        <p>Thanks for signing up. Please verify your account by clicking this link:</p>
        <p><a href={verificationLink}>Please verify your account</a></p>
        {/* <p><a href={`http://localhost:3000/api/verify/${token}`}>Please verify your account</a></p> */}

        <p>Sincerely,</p>
        <p>ForgedMart Team</p>
      </Body>
    </Html>
  );
}
