import Item from './Item';
import { ListProps } from './List.types';

const List = ({ items }: ListProps) => (
  <ul>
    {items.map(({ name, code }) => (
      <Item
        key={code}
        name={name}
        code={code}
      />
    ))}
  </ul>
);

export default List;