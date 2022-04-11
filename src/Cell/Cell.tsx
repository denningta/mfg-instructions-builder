import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Cell.css';
import { BsThreeDotsVertical, BsChevronRight } from 'react-icons/bs';
import CellOptions from './CellOptions/CellOptions';

interface CellValue {
  value?: string | undefined;
}

interface EditorState {
  visible: boolean;
}

interface BarState {
  visible: boolean;
}

interface OptionsState {
  visible: boolean;
}

function Cell() {
  const [value, setValue] = useState<CellValue>({ value: '# Hello World!' });
  const [editorState, setEditorState] = useState<EditorState>({ visible: false });
  const [barState, setBarState] = useState<BarState>({ visible: false });
  const [optionsState, setOptionsState] = useState<OptionsState>({ visible: false });

  const handleChange = (event: any) => {
    setValue({ value: event.target.value });
  };

  const handleHover = (event: any) => {
    event.preventDefault();
    if (optionsState.visible) return;
    setBarState({ visible: event.type !== 'mouseleave' });
  };

  const toggleEditor = (event: any) => {
    event.preventDefault();
    setEditorState({ visible: !editorState.visible });
  };

  const toggleOptions = (event: any) => {
    event.preventDefault();
    setOptionsState({ visible: !optionsState.visible });
  };

  return (
    <div className="" onMouseEnter={handleHover} onMouseLeave={handleHover}>
      {value.value && (
        <div className="flex w-full mb-2">
          <div
            className={`flex items-start transition ease-in-out ${
              barState.visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              type="button"
              className={`m-2 cursor-pointer transition ease-in-out ${
                editorState.visible ? 'rotate-90' : ''
              }`}
              onClick={toggleEditor}
            >
              <BsChevronRight />
            </button>
            <div className="relative grow h-full flex flex-col items-center bg-slate-200 w-6 p-2 rounded-l transition ease-in-out">
              <button type="button" onClick={toggleOptions}>
                <BsThreeDotsVertical className="cursor-pointer" />
              </button>
              <div
                className={`absolute top-0 left-7 ${
                  optionsState.visible ? 'flex flex-col' : 'hidden'
                }`}
              >
                <CellOptions />
              </div>
            </div>
          </div>
          <div className="grow">
            <div className="p-3">
              <ReactMarkdown>{value.value}</ReactMarkdown>
            </div>
            <div
              className={`overflow-clip transition ease-in-out h-0 ${
                editorState.visible ? 'h-fit' : 'h-0'
              }`}
            >
              <textarea
                className="w-full p-3 bg-sky-100 min-h-fit outline-none -mb-[6px]"
                value={value.value}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cell;
