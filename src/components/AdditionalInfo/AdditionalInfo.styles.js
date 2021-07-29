import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const Section = styled.section`
  padding: 20px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.2);
`;

export const P = styled.p`
  font-size: 20px;
`;

export const Li = styled.li`
  font-size: 18px;
  &:first-of-type {
    margin-bottom: 10px;
  }
  & .active {
    color: blueviolet;
  }
`;

export const Ul = styled.ul`
  list-style: none;
`;

export const NLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  &:hover {
    color: blueviolet;
  }
`;
