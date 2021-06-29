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

function FileItem({ file, onRemove, onUploaded }) {
  const { vicinity } = file;
  const { name, type } = file[vicinity];
  const created = file[vicinity]?.created || file[vicinity]?.lastModified;

  useEffect(() => {
    //   if (vicinity === 'browser') {
    //       console.log('start uploading file...')
    //       const uploadedFile = useUpload(file)
    //       console.log('call onUploaded when finished', onUploaded(uploadedFile))
    //   }
  }, [vicinity]);

  return (
    <S.FileItem>
      {vicinity === 'browser' && <p>loading...</p>}
      {vicinity === 'remote' && (
        <img src="https://via.placeholder.com/25" alt={name} />
      )}
      <p>{name}</p>
      <p>{created}</p>
      <p>{type}</p>
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
    // properties from browser file api
    browser: PropTypes.shape({
      name: PropTypes.string, // file name
      type: PropTypes.string, // e.g. image/jpg
      lastModified: PropTypes.number // unix timestamp
    }),
    // properties for a remote file
    remote: PropTypes.shape({
      name: PropTypes.string, // file name
      type: PropTypes.string, // e.g. image/jpg
      url: PropTypes.string, //
      created: PropTypes.string, // datetime string?? or date?? unknown
      id: PropTypes.string // guid
    })
  }),

  onRemove: PropTypes.func,
  onUploaded: PropTypes.func
};

export default FileItem;
