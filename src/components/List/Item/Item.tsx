import { useAppDispatch } from '../../../hooks';
import { getCountryDetails } from '../../Map/mapSlice';
import { ItemProps } from './Item.types';

const Item = ({ name, code }: ItemProps) => {
  const dispatch = useAppDispatch();
  
  return (
    <li onClick={() => dispatch(getCountryDetails(name, code))}>
      {name}
    </li>
  );
};

export default Item;