/* eslint-disable react/require-default-props */
export interface MenuItem {
  title: string;
  action: 'edit' | 'pin' | 'addcomment';
}

interface Props {
  menuItems?: MenuItem[];
  selectOption: Function;
}

const defaultMenuItems: MenuItem[] = [
  {
    title: 'Edit',
    action: 'edit',
  },
  {
    title: 'Pin',
    action: 'pin',
  },
  {
    title: 'Add comment',
    action: 'addcomment',
  },
];

function CellOptions({ menuItems = defaultMenuItems, selectOption }: Props) {
  return (
    <div className="bg-white p-1 border border-gray-300 w-[150px] rounded">
      {menuItems.map((menuItem) => (
        <div key={menuItem.title}>
          <button
            type="submit"
            className="cursor-pointer hover:bg-sky-200 px-3 py-1 w-full text-left rounded"
            onClick={() => selectOption(menuItem)}
          >
            {menuItem.title}
          </button>
        </div>
      ))}
    </div>
  );
}

export default CellOptions;
