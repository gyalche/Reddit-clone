import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Divider,
  Text,
  Input,
  Checkbox,
  Stack,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { CgLayoutGrid } from 'react-icons/cg';
type CraeteCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};
const CraeteCommunityModal: React.FC<CraeteCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [communityName, setCommunityName] = useState('');
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState('public');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [user] = useAuthState(auth);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
    //recalculate how many chars we have left in the name;
    setCharsRemaining(21 - e.target.value.length);
  };

  const onCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
  };

  //create community function
  const handleCreateCommunity = async () => {
    try {
      //validate community name;
      const format = /^[^* | \ " : < > [ ] { } ` \ ( ) '' ; @ & $]+$/;
      if (format.test(communityName) || communityName.length < 3) {
        setError(
          'community name must be between 3-21 and can only contain letters, numbers or uderscore'
        );
        return;
      }
      setLoading(true);
      //if valid than create community document in firestore;
      //Check that name is not taken;
      //if valid name, crete community;

      const communityDocRef = doc(firestore, 'communities', communityName);
      //check if community exists in db;
      const communityDoc = await getDoc(communityDocRef);
      if (communityDoc.exists()) {
        throw new Error(`Sorry, r/${communityName} is taken. Try another`);
      }
      //create community document;
      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            p={3}>
            Create a Community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={400} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community name including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400">
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? 'red' : 'gray.500'}>
                {charsRemaining}Charcters remaining
              </Text>
              <Text color="red" fontSize="9pt" p={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                {/*checkbox component*/}
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === 'public'}
                    onChange={onCommunityTypeChange}>
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        {' '}
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === 'restricted'}
                    onChange={onCommunityTypeChange}>
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        {' '}
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === 'private'}
                    onChange={onCommunityTypeChange}>
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        {' '}
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved user can view and submit to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateCommunity}
              isLoading={loading}
              height="30px">
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CraeteCommunityModal;
