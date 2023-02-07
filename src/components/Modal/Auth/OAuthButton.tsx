import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';

const OAuthButton: React.FC = () => {
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button mb={2} variant="oauth">
        <Image src="/images/googlelogo.png" height="20px" mr={2} />
        Login With Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
    </Flex>
  );
};
export default OAuthButton;
