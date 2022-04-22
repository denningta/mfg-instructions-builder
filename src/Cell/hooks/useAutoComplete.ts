/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Editor, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import LOOKUP_DATA from '../CellEditor/temp-lookup-data';

export interface AutoCompleteItem {
  id: string;
  title: string;
  type: string;
}

export interface AutoCompleteState {
  editor: Editor;
  target: Range | null | undefined;
  search: string;
  index: number;
  selectionMade: boolean;
  autoCompleteDropdown?: HTMLDivElement;
  items: AutoCompleteItem[];
  onSelectAutoComplete(itemIndex: number): void;
  onKeyDown(event: any): void;
  handleChange(): void;
}

const insertItem = (editor: Editor, item: AutoCompleteItem) => {};

const useAutoCompleteState = (editor: Editor): AutoCompleteState => {
  const [target, setTarget] = useState<Range | null>();
  const [search, setSearch] = useState('');
  const [index, setIndex] = useState(0);
  const [selectionMade, setSelectionMade] = useState(false);

  const items: AutoCompleteItem[] = LOOKUP_DATA.filter((c) =>
    c.id.toLowerCase().startsWith(search.toLowerCase())
  );

  const onSelectAutoComplete = (itemIndex: number) => {
    if (target) {
      Transforms.select(editor, target);
      Transforms.insertText(editor, items[itemIndex].id);
      setTarget(null);
    }
  };

  const onKeyDown = (event: any) => {
    if (event.key === ' ' || event.key === 'Enter') setSelectionMade(false);
    if (target && items.length > 0) {
      const prevIndex = index >= items.length - 1 ? 0 : index + 1;
      const nextIndex = index <= 0 ? items.length - 1 : index - 1;
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
          onSelectAutoComplete(index);
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
  };

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

  return {
    editor,
    target,
    search,
    index,
    selectionMade,
    items,
    onSelectAutoComplete,
    onKeyDown,
    handleChange
  };
};

export default useAutoCompleteState;
