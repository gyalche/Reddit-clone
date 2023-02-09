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
} from '@chakra-ui/react';
type CraeteCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CraeteCommunityModal: React.FC<CraeteCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  return (
    <div>
      {open ? (
        <>
          <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>DON is WORKING</ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleClose}>
                  Close
                </Button>
                <Button variant="ghost">Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <>I am close</>
      )}
    </div>
  );
};
export default CraeteCommunityModal;
