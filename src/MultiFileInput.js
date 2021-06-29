import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as S from './MultiFileInput.styles.js';

function Empty({ onClick }) {
  return (
    <div>
      <h1>Drag images here or browse</h1>
      <button>BROWSE</button>
    </div>
  );
}

function Populated({ files, children }) {
  console.log('files is', files);
  return (
    <>
      {files.map((file) => (
        <FileItem key={file.name} preview={file.preview} name={file.name} />
      ))}
      {children}
    </>
  );
}

function FileItem({ name, preview }) {
  return (
    <div key={name}>
      <img
        src={preview}
        alt={name}
        style={{ width: '3em', aspectRatio: '1 / 1' }}
      />
    </div>
  );
}

function MultiFileInput({ onChange, quota = 10, initialFiles = [] }) {
  const [files, setFiles] = useState(initialFiles);

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ]);
    },
    [files]
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
    accept: 'image/jpeg, image/png'
  });

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section>
      <S.MultiFileInput
        {...getRootProps({ isDragAccept, isDragActive, isDragReject })}
      >
        {files.length > 0 ? (
          <Populated files={files}>
            <button>add more files</button>
          </Populated>
        ) : (
          <Empty onClick={open} />
        )}
        <input {...getInputProps()} />
      </S.MultiFileInput>
    </section>
  );
}

export default MultiFileInput;
