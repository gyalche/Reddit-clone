import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, VsAccount } from '@chakra-ui/icons';
import { User } from 'firebase/auth';
import { FaRedditSquare } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { IoSparkTest } from 'react-icons/io';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import { authModalState } from '@/atoms/authModealAtom';
import { useSetRecoilState } from 'recoil';
type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}>
        <Flex align="center">
          <Flex justifyContent="center" alignItems="center">
            {user ? (
              <>
                <Icon
                  as={FaRedditSquare}
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                />
                <Flex
                  direction="column"
                  display={{ base: 'none', lg: 'flex' }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}>
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split('@')[0]}
                  </Text>
                  <Flex>
                    <Icon as={IoSparkTest} color="brand.100" mr={1} />
                    <Text color="gray.100">1 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon as={VsAccount} fontSize={24} color="gray.400" mr={1}>
                no user
              </Icon>
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{
                bg: 'blue.500',
                color: 'white',
              }}>
              <Flex align="center">
                <Icon as={CgProfile} fontSize={20} mr={2} />
                <Text>Profile</Text>
              </Flex>
            </MenuItem>

            <MenuDivider />

            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{
                bg: 'blue.500',
                color: 'white',
              }}
              onClick={() => signOut(auth)}>
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                <Text>Logout</Text>
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{
                bg: 'blue.500',
                color: 'white',
              }}
              onClick={() => setAuthModalState({ open: true, view: 'login' })}>
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                <Text>Login / Sign Up</Text>
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
