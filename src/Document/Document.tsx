import Cell, { CellValue } from '../Cell/Cell';

const cellValues: CellValue[] = [
  {
    id: 1,
    blockContent: [
      {
        type: 'paragraph',
        children: [{ text: 'Hello World' }]
      },
      {
        type: 'paragraph',
        children: [{ text: 'This is second line of the first cell' }]
      }
    ]
  },
  {
    id: 2,
    blockContent: [
      {
        type: 'paragraph',
        children: [{ text: 'This is the second cell' }]
      },
      {
        type: 'paragraph',
        children: [{ text: 'This is second line of the second cell' }]
      }
    ]
  }
];

function Document() {
  return (
    <div>
      {cellValues.map((cellValue) => (
        <div key={cellValue.id}>
          <Cell cellValue={cellValue} />
        </div>
      ))}
    </div>
  );
}

export default Document;
