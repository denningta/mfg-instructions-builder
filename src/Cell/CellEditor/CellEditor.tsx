/* eslint-disable function-paren-newline */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { CustomElement } from './custom-types.d';
import useRenderElements from '../hooks/useRenderElements';
import withShortcuts from './withShortcuts';
import useAutoComplete from '../hooks/useAutoComplete';
import AutoComplete from './AutoComplete/AutoComplete';

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Hello World' }],
  },
];

function CellEditor() {
  const editor = useMemo(() => withShortcuts(withReact(createEditor())), []);
  const renderElement = useRenderElements();
  const autoComplete = useAutoComplete(editor);

  return (
    <Slate editor={editor} value={initialValue} onChange={autoComplete.handleChange}>
      <Editable
        renderElement={renderElement}
        onKeyDown={autoComplete.onKeyDown}
        spellCheck
        autoFocus
        className="p-3 bg-slate-100"
      />
      <AutoComplete {...autoComplete} />
    </Slate>
  );
}
export default CellEditor;
