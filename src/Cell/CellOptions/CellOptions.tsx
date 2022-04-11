/* eslint-disable react/require-default-props */
interface Props {
  menuItems?: string[];
}

function CellOptions({ menuItems = ['Edit', 'Pin', 'Add comment'] }: Props) {
  return (
    <div className="bg-white p-2 border border-gray-300 w-[150px]">
      {menuItems.map((menuItem) => (
        <div className="cursor-pointer hover:bg-gray-300 px-3 py-1">{menuItem}</div>
      ))}
    </div>
  );
}

export default CellOptions;
