import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileItem from './FileItem.js';
import * as S from './MultiFileInput.styles.js';

function Empty({ onClick }) {
  return (
    <div>
      <h1>Drag images here or browse</h1>
      <button onClick={onClick}>BROWSE</button>
    </div>
  );
}

function MultiFileInput({
  onChange,
  useUploadFile,
  quota = 10,
  initialFiles = []
}) {
  const [browserFiles, setBrowserFiles] = useState([]);
  const [remoteFiles, setRemoteFiles] = useState(initialFiles);

  useEffect(() => {
    onChange(remoteFiles);
  }, [remoteFiles, onChange]);

  const onRemove = (file) => {
    const { vicinity } = file;

    if (vicinity === 'remote') {
      console.log('unset remote file');
    }

    if (vicinity === 'browser') {
      setBrowserFiles(
        browserFiles.filter((f) => f.fileInfo.path !== file.fileInfo.path)
      );
    }
  };

  const fileCount = useMemo(
    () => remoteFiles.length + browserFiles.length,
    [browserFiles, remoteFiles]
  );

  const onUploaded = (newRemoteFile, oldLocalFile) => {
    setRemoteFiles([...remoteFiles, newRemoteFile]);
    setBrowserFiles(
      browserFiles.filter((f) => f.fileInfo.path !== oldLocalFile.fileInfo.path)
    );
  };

  console.log([...browserFiles, ...remoteFiles]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setBrowserFiles([
        ...browserFiles,
        ...acceptedFiles.map((file) => {
          return {
            vicinity: 'browser',
            fileInfo: file
          };
        })
      ]);
    },
    [browserFiles]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    noClick: true,
    noKeyboard: true
  });

  return (
    <section>
      <S.MultiFileInput
        {...getRootProps({ isDragAccept, isDragActive, isDragReject })}
      >
        {fileCount > 0 ? (
          <>
            {[...remoteFiles, ...browserFiles].map((file, i) => (
              <FileItem
                key={file.fileInfo.name || i}
                file={file}
                onUploaded={onUploaded}
                useUploadFile={useUploadFile}
                onRemove={onRemove}
              />
            ))}
            <button style={{ marginTop: '1em' }} onClick={open}>
              add more files
            </button>
          </>
        ) : (
          <Empty onClick={open} />
        )}
        <input {...getInputProps()} />
      </S.MultiFileInput>
    </section>
  );
}

export default MultiFileInput;
