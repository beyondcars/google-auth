import { Box, Typography, Button } from "@mui/material"
import { useSession, signIn, signOut } from "next-auth/react"

const Home = () => {

  const { data: session, status } = useSession();

  if (session) {
    return (
      <Box>
        <Typography>Signed in as {session.user?.email}</Typography>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Box>
    )
  }
  return (
    <Box>
      <Button onClick={() => signIn()}>Sign in</Button>
    </Box>
  )
}

export default Home