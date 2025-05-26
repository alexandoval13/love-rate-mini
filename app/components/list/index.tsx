export type ListItem = {
  id: number | string;
  label: string;
  date?: string;
  image?: string;
};

export type ListPropsType = {
  data: ListItem[];
  handleSelect?: () => void;
};

const List = (props: ListPropsType) => {
  const { data } = props;
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          {item.label} ({item.date})
        </li>
      ))}
    </ul>
  );
};

export default List;
