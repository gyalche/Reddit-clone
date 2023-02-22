import {
  Community,
  communitySnipper,
  communityState,
} from '@/atoms/communitiesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { communitySnipper } from '../atoms/communitiesAtom';
import { authModalState } from '@/atoms/authModealAtom';

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user signed in?
    //if not=>open auth modal;

    if (!user) {
      //open model;
      setAuthModalState({ open: true, view: 'login' });
      return;
    }
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      //get users snippets;
      const snippetDocs = await getDocs(
        collection(firestore, `user/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      console.log('snippets', snippets);
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as communitySnipper[],
      }));
    } catch (error: any) {
      console.log('getMysnippet', error);
      setError(error.message);
    }
    setLoading(false);
  };
  const joinCommunity = async (communityData: Community) => {
    //batch writes;
    //creating a new community snippet;
    //updating the number of members on this community;

    try {
      const batch = writeBatch(firestore);
      const newSnippet: communitySnipper = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || '',
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      batch.update(doc(firestore, 'communities', communityData.id), {
        numberOfMembers: increment(1),
      });
      batch.commit();

      //update recoil state->communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippet: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };
  const leaveCommunity = async (communityId: string) => {
    try {
      //batch writes;
      //deleting community snippet from user;
      //updating the numberOfMembers (-1);
      const batch = writeBatch(firestore);
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      batch.update(doc(firestore, `communities`, communityId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();
      //update recoil state->communityState.mySnippets

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log('error', error.message);
      setError(error.message);
    }
  };
  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);
  return {
    //data and function;
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
