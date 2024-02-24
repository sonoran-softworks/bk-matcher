import './App.css';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState } from 'react';


const BAD_ADDRESS = 'QmbGvE3wmxex8KiBbbvMjR8f9adR28s3XkiZSTuGmHoMHV'
const BIT_ADDRESS = 'bafybeicbq3ppvshoxi7tpobqbgztdnilpovlxtyhxxmne3lqwomgywekyi'
const STARGAZE_ADDRESS = 'https://www.stargaze.zone/m/'
const BAD_STARGAZE = 'stars19jq6mj84cnt9p7sagjxqf8hxtczwc8wlpuwe4sh62w45aheseues57n420'
const BIT_STARGAZE = 'stars1pqcldy82fcmptkzvzakwlv3gtpgupewc3e3q598mg5nrr25rv40qpu0z5v'

const IMG_ADDRESS = 'https://ipfs-gw.stargaze-apis.com/ipfs/'

const BKCard = ({ id, address, kidType }) =>
  <div className='bg-white rounded-lg shadow-lg p-4 w-5/6'>
    <h2 className='text-xl font-bold'>
      <a 
      className='underline text-blue-500 hover:text-blue-700'
        href={`${STARGAZE_ADDRESS}${kidType === 'bad' ? BAD_STARGAZE : BIT_STARGAZE}/${id}`}
        target='_blank'
        rel='noreferrer'
        >
          See {kidType.toUpperCase()} Kid {id} on Stargaze
        </a>
    </h2>
    <LazyLoadImage
      effect='blur'
      alt={`Kid ${id} ${kidType} type`}
      className='object-cover mt-2 rounded-lg'
      src={`${IMG_ADDRESS}/${address}/${id}.${kidType === 'bad' ? 'jpg' : 'png'}`}
    />
  </div>

const BKGrid = ({ids}) => {
  if (!ids) return null

  let idsToRender = ids.trim().split(',')
  // remove empty strings
  idsToRender = idsToRender.filter(Boolean)
  // remove non-numeric strings
  idsToRender = idsToRender.filter((i) => !isNaN(i))
  // remove numbers over 9999
  idsToRender = idsToRender.filter((i) => i <= 9999)

  return <div className='grid grid-cols-2 gap-4 my-4 place-items-center'>
    {
      idsToRender.map((i) =>
      <>
        <BKCard key={`${BAD_ADDRESS}+${i}`} id={i} address={BAD_ADDRESS} kidType='bad'/>
        <BKCard key={`${BIT_ADDRESS}+${i}`} id={i} address={BIT_ADDRESS} kidType='bit'/>
        </>
        )
    }
  </div>
}

function App() {
  const [ids, setIds] = useState(null);

  const handleInputChange = (event) => {
    setIds(event.target.value);
    console.log(ids);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-300">
      <h1 className='text-xl mt-4'>
        Enter a list of ids to see pairs, comma separated
      </h1>
      <input
        onChange={handleInputChange}
        className='border-2 border-black rounded-lg p-2 m-4 w-1/2 text-center'
        id="id-list" type='text' />
        <BKGrid ids={ids}/>
    </div>
  );
}

export default App;
