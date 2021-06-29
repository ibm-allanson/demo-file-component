import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import * as S from './MultiFileInput.styles.js';

// const useUpload = () => {
//   return {
//     vicinity: 'remote',
//     remote: {
//       id: 'some id',
//       name: 'the name of the file.jpg',
//       type: 'image/jpeg',
//       url: 'url to file',
//       created: 'a date'
//     }
//   };
// };

function FileItem({ file, onRemove, onUploaded, useUploadFile }) {
  const [uploadedFile, uploadFile] = useUploadFile();
  const { vicinity, fileInfo } = file;
  const created =
    vicinity === 'browser' ? file.fileInfo.lastModified : file.fileInfo.created;

  useEffect(() => {
    if (vicinity === 'browser') {
      uploadFile(fileInfo);
    }
  }, [vicinity, fileInfo, uploadFile]);

  useEffect(() => {
    if (uploadedFile && file.vicinity === 'browser') {
      onUploaded({ vicinity: 'remote', fileInfo: uploadedFile }, file);
    }
  }, [file, uploadedFile, onUploaded]);

  return (
    <S.FileItem>
      {vicinity === 'browser' && <p>loading...</p>}
      {vicinity === 'remote' && (
        <img src={file.fileInfo.id} alt={fileInfo.name} />
      )}
      <p>{fileInfo.name}</p>
      <p>{created}</p>
      <button
        onClick={() => {
          onRemove(file);
        }}
      >
        Remove file
      </button>
    </S.FileItem>
  );
}

FileItem.propTypes = {
  file: PropTypes.shape({
    vicinity: PropTypes.oneOf(['browser', 'remote']).isRequired,
    fileInfo: PropTypes.shape({
      name: PropTypes.string, // file name

      // if vicinity === 'browser', properties from browser file api
      lastModified: PropTypes.number, // unix timestamp

      // if vicinity === 'remote', properties for a remote file
      created: PropTypes.string, // datetime string?? or date?? unknown
      id: PropTypes.string // guid
    })
  }),

  onRemove: PropTypes.func,
  onUploaded: PropTypes.func
};

export default FileItem;
