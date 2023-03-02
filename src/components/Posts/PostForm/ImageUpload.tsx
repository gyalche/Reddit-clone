import { Button, Flex, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useRef } from 'react';

type ImageUploadProps = {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onSelectImage,
  selectedFile,
  setSelectedTab,
  setSelectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>();
  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <img
            src={selectedFile}
            style={{
              maxWidth: '400px',
              maxHeight: '400px',
              objectFit: 'contain',
            }}
          />
          <Stack direction="row" mt={4}>
            <Button height="20px" onClick={() => setSelectedTab('Post')}>
              Back to post
            </Button>
            <Button
              variant="outline"
              height="20px"
              onClick={() => {
                setSelectedFile('');
              }}>
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Flex
            justify="center"
            align="center"
            p={20}
            border="1px dashed"
            borderColor="gray.200"
            width="100%">
            <Button
              variant="outline"
              height="28px"
              onClick={() => {
                selectedFileRef.current?.click();
              }}>
              Upload
            </Button>
            <input
              ref={selectedFileRef}
              type="file"
              hidden
              onChange={onSelectImage}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};
export default ImageUpload;
