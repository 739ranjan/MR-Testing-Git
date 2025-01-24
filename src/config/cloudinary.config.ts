import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
  cloud_name: 
  'dzpboqbsj',
    // process.env.CLOUDINARY_CLOUD_NAME,
    api_key: 
    '996521596424833',
    // process.env.CLOUDINARY_API_KEY,
    api_secret:
    'DaZZK3O9HtQj5nkmtqslAMONRxQ'
    //  process.env.CLOUDINARY_API_SECRET,
  });

  export default cloudinary;

