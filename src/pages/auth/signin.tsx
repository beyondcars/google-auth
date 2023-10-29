import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import { Box, Stack, Button } from "@mui/material"
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }
}

const SignIn = ({ providers }: { providers: Array<IProvider> }) => {

    return (
        <Box>
            <Stack direction='column' spacing={2}>
                {Object.values(providers).map(x => (
                    <Box key={x.id}>
                        <Button
                            onClick={async () => {
                                await signIn(x.id, {
                                    callbackUrl: 'http://localhost:3000/'
                                })
                            }}
                        >
                            {x.name}
                        </Button>
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}

export default SignIn

interface IProvider {
    id: string;
    name: string;
}