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

  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <Editable renderElement={renderElement} spellCheck autoFocus className="p-3 bg-slate-100" />
      </Slate>
    </div>
  );
}
export default CellEditor;
