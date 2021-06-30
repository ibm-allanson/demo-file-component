import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

export const MultiFileInput = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-width: 2;
  border-radius: 2;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #1f2937;
  transition: border 0.3s ease-in-out;

  ${ifProp(
    'isDragAccept',
    css`
      border-color: #00e676;
      color: #6b7280;
      opacity: 0.7;
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
