// /pages/services/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { services } from '../../lib/services';


interface ServiceProps {
  service: { id: string; name: string; description: string } | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = services.map(service => ({
    params: { id: service.id },
  }));

  return { paths, fallback: false }; 
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const service = services.find(service => service.id === params?.id) || null;

  return {
    props: { service },
  };
};

const ServicePage = ({ service }: ServiceProps) => {
  const router = useRouter();

  if (!service) {
    return <p>Service not found</p>;
  }

  return (
    <div className='h-full bg-background text-text p-4'>
      <div className='flex flex-row items-center justify-between px-5'>
        <h1 className='font-serif lg:text-5xl -skew-x-1 '>{service.name}</h1>
        <button className='shadow-inner border-4 border-border p-2 m-2 rounded-md bg-foreground hover:scale-95 transition ease-in-out duration-500' onClick={() => router.back()}>Return</button>
      </div>
      <span>{service.description}</span>
    </div>
  );
};

export default ServicePage;
