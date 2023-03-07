import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: 'public' | 'restricted' | 'private';
  createdAt?: Timestamp;
  imageURL?: string;
}
export interface communitySnipper {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}
interface CommunityState {
  mySnippets: communitySnipper[];
  currentCommunity?: Community;
}
const defaultCommunityState: CommunityState = {
  mySnippets: [],
};

export const communityState = atom<CommunityState>({
  key: 'communitiesState',
  default: defaultCommunityState,
});
