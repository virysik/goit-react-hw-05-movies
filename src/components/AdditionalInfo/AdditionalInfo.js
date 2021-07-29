import { useRouteMatch } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Section, P, Li, NLink, Ul } from './AdditionalInfo.styles';

function AdditionalInfo() {
  const { url } = useRouteMatch();

  return (
    <>
      <Section>
        <P>Additional Information</P>
        <Ul>
          <Li>
            <NLink to={`${url}/cast`}>
              <BiRightArrowAlt />
              Cast
            </NLink>
          </Li>
          <Li>
            <NLink to={`${url}/reviews`}>
              <BiRightArrowAlt />
              Reviews
            </NLink>
          </Li>
        </Ul>
      </Section>
    </>
  );
}

export default AdditionalInfo;
