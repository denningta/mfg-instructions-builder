import { useEffect, useRef } from 'react';
import { ReactEditor } from 'slate-react';
import { AutoCompleteState } from '../../hooks/useAutoComplete';

function AutoComplete({
  editor,
  target,
  items,
  index,
  search,
  onSelectAutoComplete
}: AutoCompleteState) {
  const autoCompleteDropdown = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (target && items.length > 0) {
      const el = autoCompleteDropdown.current;
      if (!el) return;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.bottom + window.scrollY + 5}px`;
      el.style.left = `${rect.right + window.scrollX}px`;
    }
  }, [items.length, editor, index, search, target]);

  return (
    <div>
      {target && items.length > 0 && (
        <div
          className="absolute p-1 bg-white border border-gray-300 rounded max-h-[300px] w-[300px] overflow-auto z-50"
          ref={autoCompleteDropdown}
        >
          {items.map((item, i) => (
            <button
              type="button"
              key={item.id}
              className={`cursor-pointer hover:bg-sky-200 px-3 py-1 w-full text-left rounded ${
                i === index ? 'bg-sky-200' : 'bg-transparent'
              }`}
              onClick={() => onSelectAutoComplete(i)}
            >
              {item.id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutoComplete;
