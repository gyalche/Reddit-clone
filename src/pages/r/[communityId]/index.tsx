import React, {useEffect} from 'react';
import { Community, communityState } from '@/atoms/communitiesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from '@/components/Community/NotFound';
import Header from '@/components/Community/Header';
import PageContent from '@/components/Layout/PageContent';
import CreatePostLink from '@/components/Community/CreatePostLink';
import Posts from '@/components/Posts/Posts';
import { useResetRecoilState } from 'recoil';
import About from '@/components/Community/About';

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log('madar choard', communityData);
  const setCommunityStateValue=useResetRecoilState(communityState);
    return <NotFound />;
  }
  useEffect(() => {
    setCommunityStateValue(prev=>({
      ...prev, currentCommunity:communityData;
    }))
  }, []);
  
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About />
        </>
      </PageContent>
    </>
  );
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
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : '',
      },
    };
  } catch (error) {
    return error;
  }
}
export default CommunityPage;
