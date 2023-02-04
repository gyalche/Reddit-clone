import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { authModalState } from '@/atoms/authModealAtom';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === 'login' && 'login'}
            {modalState.view === 'signup' && 'signup'}
            {modalState.view === 'resetPassword' && 'resetPassword'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bp={6}>
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%">
              {/*OAuthButton*/}
              {/*AuthInput*/}
              <AuthInputs />
              {/*ResetPassword*/}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
