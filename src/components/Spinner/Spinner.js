import Loader from 'react-loader-spinner';

function Spinner() {
  return (
    <div>
      <Loader type="Oval" color="#888888" height={80} width={80} />
    </div>
  );
}

export default Spinner;
