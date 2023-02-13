import { auth, firestore } from '@/firebase/clientApp';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
const OAuthButton: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);
  const loginGoogle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithGoogle();
  };

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, 'user', user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);
  return (
    <Flex direction="column" width="100%" mb={4} onClick={loginGoogle}>
      <Button mb={2} variant="oauth" isLoading={loading}>
        <Image src="/images/googlelogo.png" height="20px" mr={2} />
        Login With Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};
export default OAuthButton;
