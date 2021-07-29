import { Header, Ul, Li, NLink } from './Navigation.styles';

function Navigation() {
  return (
    <Header>
      <nav>
        <Ul>
          <Li>
            <NLink to="/" exact>
              Home
            </NLink>
          </Li>
          <Li>
            <NLink to="/movies">Movies</NLink>
          </Li>
        </Ul>
      </nav>
    </Header>
  );
}

export default Navigation;
