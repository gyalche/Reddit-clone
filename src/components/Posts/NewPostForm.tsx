import { Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { BiPoll } from 'react-icons/bi';
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
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

  //creating the post;
  const handleCreatePost = async () => {
    //create a new post object;=>type post;
    const newPost: Post = {};
    //store the post in db;
    //check for selectedFile;
    //store in storage;
    //update the post doc by adding imageURL;
    //redirect the user back to the communitypage using the router;
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

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
            key={item.title}
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
        {selectedTab === 'Images & Video' && (
          <ImageUpload
            onSelectImage={onSelectImage}
            selectedFile={selectedFile}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
