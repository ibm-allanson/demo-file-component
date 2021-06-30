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
  onError,
  useUploadFile,
  quota = 10,
  initialFiles = []
}) {
  const [browserFiles, setBrowserFiles] = useState([]);
  const [remoteFiles, setRemoteFiles] = useState(initialFiles);

  const fileCount = useMemo(
    () => remoteFiles.length + browserFiles.length,
    [browserFiles, remoteFiles]
  );

  const onUploaded = (newRemoteFile, oldLocalFile) => {
    setRemoteFiles([...remoteFiles, newRemoteFile]);
    setBrowserFiles(
      browserFiles.filter((f) => f.meta.path !== oldLocalFile.meta.path)
    );
  };

  const status =
    fileCount < quota ? (fileCount === 0 ? 'EMPTY' : 'AVAILABLE') : 'FULL';
  let statusMessage;
  switch (status) {
    case 'EMPTY':
      statusMessage = `Add up to ${quota - fileCount} files`;
      break;
    case 'AVAILABLE':
      statusMessage = `You can add ${quota - fileCount} more file${
        quota - fileCount !== 1 ? 's' : ''
      }`;
      break;
    case 'FULL':
      statusMessage = `Added ${quota} of ${quota} available files`;
      break;
    default:
      break;
  }

  useEffect(() => {
    onChange(remoteFiles);
  }, [remoteFiles, onChange]);

  const onRemove = (file) => {
    const { vicinity } = file;

    if (vicinity === 'remote') {
      setRemoteFiles(remoteFiles.filter((f) => f.meta.id !== file.meta.id));
    }

    if (vicinity === 'browser') {
      setBrowserFiles(
        browserFiles.filter((f) => f.meta.name !== file.meta.name)
      );
    }
  };

  console.log([...browserFiles, ...remoteFiles]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newCount = acceptedFiles.length;
      const nextFiles = [...browserFiles];

      if (newCount + fileCount > quota) {
        const available = quota - fileCount;
        acceptedFiles.splice(available);
        onError({
          title: `Maximum image upload of ${quota} files reached`,
          text: ` To add more files, first remove an existing file`
        });
      }

      nextFiles.push(
        ...acceptedFiles.map((file) => {
          return {
            vicinity: 'browser',
            meta: file
          };
        })
      );

      setBrowserFiles(nextFiles);
    },
    [browserFiles, fileCount, quota, onError]
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
        <p>{statusMessage}</p>
        {fileCount > 0 ? (
          <>
            {[...remoteFiles, ...browserFiles]
              .sort((a, b) => a.meta.name.localeCompare(b.meta.name))
              .map((file, i) => (
                <FileItem
                  key={file.meta?.id || file.meta.name} // todo, fix when not using placeholder data
                  file={file}
                  onUploaded={onUploaded}
                  useUploadFile={useUploadFile}
                  onRemove={onRemove}
                />
              ))}
            <button
              disabled={status === 'FULL'}
              style={{ marginTop: '1em' }}
              onClick={open}
            >
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
