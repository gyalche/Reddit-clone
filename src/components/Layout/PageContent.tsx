import { Flex } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {
  chilr: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }: chilr) => {
  console.log('HERE IS CHILDREN', children);
  return (
    <Flex border="1px solid red" justify="center" p="16px 0px">
      <Flex
        border="1px solid green"
        justify="center"
        width="95%"
        maxWidth="860px">
        {/*LHS*/}
        <Flex
          border="1px solid blue"
          direction="column"
          width={{ base: '100%', md: '65%' }}
          mr={{ base: '0', md: 6 }}>
          {children && children[0]}
        </Flex>
        {/*RHS*/}
        <Flex
          border="1px solid orange"
          direction="column"
          display={{ base: 'none', md: 'flex' }}
          flexGrow={1}>
          {children && children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
