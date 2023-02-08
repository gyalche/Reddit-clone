import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import AutButtons from './AutButtons';
import AuthModal from '@/components/Modal/Auth/AuthModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { User, signOut } from 'firebase/auth';
import Icons from './Icons';
import UserMenu from './UserMenu';

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      {/*<AutoModel />*/}
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AutButtons />}
        {/*Dropdown menu*/}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
