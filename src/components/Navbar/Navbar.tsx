import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import Directory from './Directory/Directory';
type NavbarProps = {};
const Navbar: React.FC<NavbarProps> = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex bg="white" padding="6px 12px" justify={{ md: 'space-between' }}>
      <Flex align="center" width={{ base: '40px', md: 'unset' }}>
        <Image
          margin="10px"
          src="/images/redditFace.svg"
          height="30px"
          cursor="pointer"
        />
        <Image
          src="/images/redditText.svg"
          height="46px"
          cursor="pointer"
          display={{ base: 'none', md: 'unset' }}
        />
      </Flex>
      {/* Directory */}
      <Directory />
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
