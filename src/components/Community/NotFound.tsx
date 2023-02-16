import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh">
      Sorry, that community does not exist
      <Link href="/">
        <Button mt={4}>GO HOME</Button>
      </Link>
    </Flex>
  );
};
export default NotFound;
