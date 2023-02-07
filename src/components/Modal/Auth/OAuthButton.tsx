import { auth } from '@/firebase/clientApp';
import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
const OAuthButton: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const loginGoogle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithGoogle();
  };
  return (
    <Flex direction="column" width="100%" mb={4} onClick={loginGoogle}>
      <Button mb={2} variant="oauth" isLoading={loading}>
        <Image src="/images/googlelogo.png" height="20px" mr={2} />
        Login With Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
    </Flex>
  );
};
export default OAuthButton;
