/* eslint-disable operator-linebreak */
/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Cell.css';
import { BsThreeDotsVertical, BsChevronRight } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
import CellOptions, { MenuItem } from './CellOptions/CellOptions';
import CommentComponent from './Comment/Comment';

export interface CellComment {
  id: string;
  author: string;
  message: string;
  createdAt: Date;
  resolved: boolean;
}

interface Props {
  value?: string;
  comments?: CellComment[];
}
function Cell({ value = '', comments = [] }: Props) {
  const [cellValue, setCellValue] = useState<string>(value || '# Hello World');
  const [editorVisible, setEditorVisibility] = useState<boolean>(false);
  const [barVisible, setBarVisibility] = useState<boolean>(false);
  const [optionsVisible, setOptionsVisibility] = useState<boolean>(false);
  const [commentsVisible, setCommentsVisibility] = useState<boolean>(false);
  const [commentNotificationVisible, setCommentNotificationVisibility] = useState<boolean>(
    !!comments.length,
  );
  const [cellComments, setCellCommentsState] = useState<CellComment[]>(comments);

  useEffect(() => {
    setCommentNotificationVisibility(!!cellComments.length);
  }, [cellComments]);

  const handleChange = (event: any) => setCellValue(event.target.value);

  const handleHover = (event: any) => {
    event.preventDefault();
    if (optionsVisible) return;
    setBarVisibility(event.type !== 'mouseleave');
  };

  const toggleEditor = (event: any) => {
    event.preventDefault();
    setEditorVisibility(!editorVisible);
  };

  const toggleOptions = (event: any) => {
    event.preventDefault();
    setOptionsVisibility(!optionsVisible);
  };

  const toggleComments = (event: any) => {
    event.preventDefault();
    setCommentsVisibility(!commentsVisible);
  };

  const selectOption = (menuItem: MenuItem) => {
    const newComment: CellComment = {
      id: '123',
      author: 'Anonymous',
      message: 'test message',
      createdAt: new Date(),
      resolved: false,
    };
    switch (menuItem.action) {
      case 'edit':
        setEditorVisibility(true);
        break;
      case 'addcomment':
        setCommentsVisibility(true);
        setCellCommentsState([...cellComments, newComment]);
        break;
      default:
        break;
    }
    setOptionsVisibility(false);
  };

  return (
    <div className="" onMouseEnter={handleHover} onMouseLeave={handleHover}>
      {cellValue && (
        <div className="flex w-full mb-2">
          <button
            type="button"
            className={`h-fit my-2 mx-2 ${commentNotificationVisible ? 'visible' : 'invisible'}`}
            onClick={toggleComments}
          >
            <div className="flex items-center">
              <span className="mr-1">{cellComments.length}</span>
              <BiCommentDetail />
            </div>
          </button>
          <div
            className={`flex items-start transition ease-in-out ${
              barVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              type="button"
              className={`m-2 cursor-pointer transition ease-in-out ${
                editorVisible ? 'rotate-90' : ''
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
                className={`absolute top-0 left-7 ${optionsVisible ? 'flex flex-col' : 'hidden'}`}
              >
                <CellOptions selectOption={selectOption} />
              </div>
            </div>
          </div>
          <div className="grow">
            <div className="p-3">
              <ReactMarkdown>{cellValue}</ReactMarkdown>
            </div>
            <div
              className={`overflow-clip transition ease-in-out ${
                editorVisible ? 'block' : 'hidden'
              }`}
            >
              <textarea
                className="w-full p-3 bg-sky-100 min-h-fit outline-none -mb-[6px]"
                value={cellValue}
                onChange={handleChange}
              />
            </div>
            <div className={`pt-3 ${commentsVisible ? 'flex flex-col' : 'hidden'}`}>
              {cellComments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cell;
