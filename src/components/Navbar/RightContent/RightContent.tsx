import { Flex } from '@chakra-ui/react';
import React from 'react';
import AutButtons from './AutButtons';
import AuthModal from '@/components/Modal/Auth/AuthModal';

type RightContentProps = {
  //user
};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      {/*<AutoModel />*/}
      <AuthModal />
      <Flex justify="center" align="center">
        <AutButtons />
      </Flex>
    </>
  );
};
export default RightContent;
