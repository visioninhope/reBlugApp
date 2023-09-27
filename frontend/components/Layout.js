import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  useSignOut,
  getNhostSession,
  NhostSession,
  useAccessToken,
  useAuthenticated,
  useUserData,
  NhostClient
} from '@nhost/nextjs'

export default function Layout({ children }) {
  const { signOut } = useSignOut();
  const user = useUserData();
  return (
    <>
      <Navbar user={user} signOut={signOut} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
