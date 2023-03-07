import { Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { BiPoll } from 'react-icons/bi';
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
import { Post } from '@/atoms/postAtom';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { firestore, storage } from '@/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useSelectFile from '@/hooks/useSelectFile';

type NewPostFormProps = {
  user: User;
};

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
const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  // const router = userRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: '',
    body: '',
  });
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  //creating the post;
  const handleCreatePost = async () => {
    const { communityId } = router.query;
    //create a new post object;=>type post;

    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user?.uid,
      creatorDisplayName: user.email?.split('@')[0],
      title: textInput.title,
      body: textInput.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    //store the post in db;
    try {
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
      //check for selectedFile;
      if (selectedFile) {
        //store in storage;
        const imageRef = ref(storage, `post/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url');
        const downloadURL = await getDownloadURL(imageRef);
        //update the post doc by adding imageURL;
        await updateDoc(postDocRef, { imageURL: downloadURL });
      }
      //redirect the user back to the communitypage using the router;
      router.back();
    } catch (error) {
      console.log('handleCreatePost error', error.message);
      setError(true);
    }
    setLoading(false);
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
            onSelectImage={onSelectFile}
            selectedFile={selectedFile}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && alert('error occured')}
    </Flex>
  );
};
export default NewPostForm;
