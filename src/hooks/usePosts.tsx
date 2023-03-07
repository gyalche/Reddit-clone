import { Post, postState } from '@/atoms/postAtom';
import { storage, firestore } from '@/firebase/clientApp';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useRecoilState } from 'recoil';

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const onVote = async () => {};
  const onSelectPost = () => {};
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      //check if there is an image, delete if exist;
      if (post.imageURL) {
        const imgageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imgageRef);
      }
      //delete post document from firestore;
      const postDocRef = doc(firestore, 'post', post.id!);
      await deleteDoc(postDocRef);
      //update recoil state;
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      return true;
    } catch (error) {
      return false;
    }
  };
  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
export default usePosts;
