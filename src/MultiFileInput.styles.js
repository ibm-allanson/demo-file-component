import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

export const MultiFileInput = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2;
  border-radius: 2;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  transition: border 0.3s ease-in-out;

  ${ifProp(
    'isDragAccept',
    css`
      border-color: #00e676;
    `
  )}

  ${ifProp(
    'isDragActive',
    css`
      border-color: #2196f3;
    `
  )}

  ${ifProp(
    'isDragReject',
    css`
      border-color: #ff1744;
    `
  )}
`;

export const FileItem = styled('div')`
  border: 1px solid hotpink;
  margin-top: 1em;
  width: 100%;
`;
