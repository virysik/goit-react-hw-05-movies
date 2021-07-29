import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const Header = styled.header`
  padding: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
`;

export const Ul = styled.ul`
  display: flex;
  list-style: none;
`;

export const Li = styled.li`
  font-size: 20px;
  &:first-of-type {
    margin-right: 20px;
  }
  & .active {
    color: red;
  }
`;

export const NLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    color: red;
    text-decoration: underline;
  }
`;
