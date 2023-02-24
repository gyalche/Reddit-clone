import { Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { BiPoll } from 'react-icons/bi';
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';
type NewPostFormProps = {};

const formTabs: TabItem[] = [
  {
    title: 'Post',
    icons: IoDocumentText,
  },
  {
    title: 'Images & Video',
    icons: IoImageOutline,
  },
  {
    title: 'Link',
    icons: BsLink45Deg,
  },
  {
    title: 'Pull',
    icons: BiPoll,
  },
  {
    title: 'Talk',
    icons: BsMic,
  },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.argument;
};
const NewPostForm: React.FC<NewPostFormProps> = () => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: '',
    body: '',
  });
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const handleCreatePost = async () => {};

  const onSelectImage = () => {};

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}></TabItem>
        ))}
      </Flex>
      <Flex>
        {/* TextInputs */}
        {selectedTab === 'Post' && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
