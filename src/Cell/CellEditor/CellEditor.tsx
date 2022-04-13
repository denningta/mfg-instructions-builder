/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { CustomElement } from './custom-types.d';
import useRenderElements from './RenderElements';
import withShortcuts from './withShortcuts';

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Hello World' }],
  },
];

function CellEditor() {
  const editor = useMemo(() => withShortcuts(withReact(createEditor())), []);
  const renderElement = useRenderElements();

  const handleChange = (output: any) => {
    console.log(output);
  };

  return (
    <div>
      <Slate editor={editor} value={initialValue} onChange={handleChange}>
        <Editable renderElement={renderElement} spellCheck autoFocus className="p-3 bg-slate-100" />
      </Slate>
    </div>
  );
}
export default CellEditor;
