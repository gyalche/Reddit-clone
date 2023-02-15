import React from 'react';
import { Community } from '@/atoms/communitiesAtom';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from 'safe-json-stringify';

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log(communityData);
  return <div>Communiy dadta {communityData.id}</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get community data and pass it to client;
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ),
      },
    };
  } catch (error) {
    // console.log('error from serverside', error);
    return error;
  }
}
export default CommunityPage;
