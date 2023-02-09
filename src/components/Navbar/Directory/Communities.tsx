import CraeteCommunityModal from '@/components/Modal/CreateCommunity/CraeteCommunityModal';
import { Flex, MenuItem, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CraeteCommunityModal open={open} />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: 'gray.100' }}
        onClick={() => setOpen(!open)}>
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Create community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
