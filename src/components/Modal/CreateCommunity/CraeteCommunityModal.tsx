import React from 'react';

type CraeteCommunityModalProps = {
  open: boolean;
};

const CraeteCommunityModal: React.FC<CraeteCommunityModalProps> = ({
  open,
}) => {
  return <div>{open ? <>I am open</> : <>I am close</>}</div>;
};
export default CraeteCommunityModal;
