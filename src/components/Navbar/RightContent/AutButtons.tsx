import { authModalState } from '@/atoms/authModealAtom';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';
const AutButtons: React.FC = () => {
  const setAutModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={() => setAutModalState({ open: true, view: 'login' })}>
        Log In
      </Button>
      <Button
        variant="solid"
        height="28px"
        display={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={() => setAutModalState({ open: true, view: 'signup' })}>
        Sign Up
      </Button>
    </>
  );
};
export default AutButtons;
