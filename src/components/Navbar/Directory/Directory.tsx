import { authModalState } from '@/atoms/authModealAtom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { TiHome } from 'react-icons/ti';
import { Icon, Text } from '@chakra-ui/react';
import Communities from './Communities';

// type UserMenuProps = {
//   user?: User | null;
// };
const Directory: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}>
        <Flex
          align="center"
          justify="space-between"
          width={{ base: 'auto', lg: '200px' }}>
          <Flex align="center">
            <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} />
            <Flex display={{ base: 'none', lg: 'flex' }}>
              <Text fontWeight={600} fontSize="10pt">
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {/*communities*/}
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
