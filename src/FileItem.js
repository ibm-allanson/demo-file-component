import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import * as S from './FileItem.styles.js';

function FileItem({ file, onRemove, onUploaded, useUploadFile }) {
  const [uploadedFile, uploadFile] = useUploadFile();
  const { vicinity, meta } = file;
  const created =
    vicinity === 'browser'
      ? new Date(file.meta.lastModified)
      : new Date(file.meta.created);

  useEffect(() => {
    if (vicinity === 'browser') {
      uploadFile(meta);
    }
  }, [vicinity, meta, uploadFile]);

  useEffect(() => {
    if (uploadedFile && file.vicinity === 'browser') {
      onUploaded({ vicinity: 'remote', meta: uploadedFile }, file);
    }
  }, [file, uploadedFile, onUploaded]);

  return (
    <S.FileItem vicinity={vicinity}>
      <S.Meta>
        <div style={{ width: '2em', height: '50px' }}>
          {vicinity === 'browser' && <p>loading...</p>}
          {vicinity === 'remote' && <img src={file.meta.id} alt={meta.name} />}
        </div>
        <p>{meta.name}</p>
        <p>{created.toLocaleString()}</p>
      </S.Meta>
      <S.Action>
        <button
          onClick={() => {
            onRemove(file);
          }}
        >
          Remove file
        </button>
      </S.Action>
    </S.FileItem>
  );
}

FileItem.propTypes = {
  file: PropTypes.shape({
    vicinity: PropTypes.oneOf(['browser', 'remote']).isRequired,
    meta: PropTypes.shape({
      name: PropTypes.string, // file name

      // if vicinity === 'browser', properties from browser file api
      lastModified: PropTypes.number, // unix timestamp

      // if vicinity === 'remote', properties for a remote file
      created: PropTypes.number, // unix timestamp?
      id: PropTypes.string // guid
    })
  }),

  onRemove: PropTypes.func,
  onUploaded: PropTypes.func
};

export default FileItem;
