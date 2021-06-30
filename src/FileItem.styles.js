import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

export const FileItem = styled('div')`
  background-color: white;
  border: 1px solid hotpink;
  border-left: none;
  border-right: none;
  margin-top: 1em;
  padding: 0.5em;
  width: 100%;

  ${ifProp(
    { vicinity: 'browser' },
    css`
      border: 1px solid lime;
      color: #6b7280;
      opacity: 0.7;
    `
  )}
`;

export const Meta = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export const Action = styled('div')`
  margin-top: 1em;
`;
