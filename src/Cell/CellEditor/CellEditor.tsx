/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createEditor, Editor, Range, Transforms } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { CustomElement } from './custom-types.d';
import useRenderElements from './useRenderElements';
import CHARACTERS from './temp-lookup-data';
import withShortcuts from './withShortcuts';

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Hello World' }],
  },
];

function CellEditor() {
  const editor = useMemo(() => withShortcuts(withReact(createEditor())), []);
  const autoCompleteDropdown = useRef<HTMLDivElement>(null);
  const renderElement = useRenderElements();
  const [target, setTarget] = useState<Range | null>();
  const [search, setSearch] = useState('');
  const [index, setIndex] = useState(0);
  const [selectionMade, setSelectionMade] = useState(false);

  const handleChange = () => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: 'word' });
      const beforeRange = wordBefore && Editor.range(editor, wordBefore, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);

      if (beforeText && !selectionMade) {
        setTarget(beforeRange);
        setSearch(beforeText);
        setIndex(0);
      } else {
        setTarget(null);
      }
    }
  };

  const chars = CHARACTERS.filter((c) => c.toLowerCase().startsWith(search.toLowerCase())).slice(
    0,
    10,
  );

  const onSelectAutoComplete = (itemIndex: number) => {
    if (target) {
      Transforms.select(editor, target);
      Transforms.insertText(editor, chars[itemIndex]);
      setTarget(null);
    }
  };

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === ' ' || event.key === 'Enter') setSelectionMade(false);
      if (target && chars.length > 0) {
        const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
        const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            setIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            setIndex(nextIndex);
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);
            Transforms.insertText(editor, chars[index]);
            setSelectionMade(true);
            setTarget(null);
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(null);
            break;
          default:
            break;
        }
      }
    },
    [index, search, target],
  );

  useEffect(() => {
    if (target && chars.length > 0) {
      const el = autoCompleteDropdown.current;
      if (!el) return;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [chars.length, editor, index, search, target]);

  return (
    <div>
      <Slate editor={editor} value={initialValue} onChange={handleChange}>
        <Editable
          renderElement={renderElement}
          onKeyDown={onKeyDown}
          spellCheck
          autoFocus
          className="p-3 bg-slate-100"
        />
        {target && chars.length > 0 && (
          <div
            className="absolute p-1 bg-white border border-gray-300 rounded max-h-[300px] w-[300px] overflow-auto"
            ref={autoCompleteDropdown}
          >
            {chars.map((char, i) => (
              <button
                type="button"
                key={char}
                className={`cursor-pointer hover:bg-sky-200 px-3 py-1 w-full text-left rounded ${
                  i === index ? 'bg-sky-200' : 'bg-transparent'
                }`}
                onClick={() => onSelectAutoComplete(i)}
              >
                {char}
              </button>
            ))}
          </div>
        )}
      </Slate>
    </div>
  );
}
export default CellEditor;
