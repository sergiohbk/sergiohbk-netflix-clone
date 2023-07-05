import useBillboard from '@/hooks/useBillboard';

const Billboard = () => {
  const { data, loading, error } = useBillboard('/api/random');

  return <div></div>;
};

export default Billboard;
