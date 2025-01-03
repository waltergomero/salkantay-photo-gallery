'use client';
 
import { useSession, SessionProvider } from 'next-auth/react';
 
const UserName = () => {
  const session = useSession();

  return (
    <SessionProvider>
      <p>Welcome {session.data?.user.first_name + ' ' + session.data?.user.last_name}</p>
    </SessionProvider>
  )
}

export default UserName;