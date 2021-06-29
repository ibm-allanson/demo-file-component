import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileItem from './FileItem.js';
import * as S from './MultiFileInput.styles.js';

function Empty({ onClick }) {
  return (
    <div>
      <h1>Drag images here or browse</h1>
      <button>BROWSE</button>
    </div>
  );
}

function MultiFileInput({
  onChange,
  fileUploadHook,
  quota = 10,
  initialFiles = []
}) {
  const [browserFiles, setBrowserFiles] = useState([]);
  const [remoteFiles, setRemoteFiles] = useState(initialFiles);

  const fileCount = useMemo(
    () => remoteFiles.length + browserFiles.length,
    [browserFiles, remoteFiles]
  );

  useEffect(() => {
    onChange(remoteFiles);
  }, [remoteFiles, onChange]);

  const onRemove = (file) => {
    const { vicinity } = file;

    if (vicinity === 'remote') {
      // unset remote file
      console.log('unset remote file');
    }

    if (vicinity === 'browser') {
      setBrowserFiles(
        browserFiles.filter((f) => f.browser.path !== file.browser.path)
      );
    }
  };

  const onUploaded = (file) => {
    setRemoteFiles(...remoteFiles, file);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      setBrowserFiles([
        ...browserFiles,
        ...acceptedFiles.map((file) => {
          return {
            vicinity: 'browser',
            browser: file
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
                key={`${file?.remote?.name || file?.browser?.name}${i}`}
                file={file}
                onUploaded={onUploaded}
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
