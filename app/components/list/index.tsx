export type ListItem = {
  id: string;
  label: string;
  date?: string;
  image?: string;
};

export type ListPropsType = {
  data: ListItem[];
  handleSelect?: (id: string) => void;
};

const List = (props: ListPropsType) => {
  const { data, handleSelect } = props;

  const handleClick = (val: ListItem) => {
    if (handleSelect) handleSelect(val.id);
  };

  return (
    <ul>
      {data.map((item) => (
        <li
          key={item.id}
          role={handleSelect && 'button'}
          onClick={() => handleClick(item)}
        >
          {item.label} {item.date}
        </li>
      ))}
    </ul>
  );
};

export default List;
