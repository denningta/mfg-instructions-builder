/* eslint-disable operator-linebreak */
/* eslint-disable react/require-default-props */
import './Cell.css';
import { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
import { IoAdd } from 'react-icons/io5';

// Components
import CellOptions, { MenuItem } from './CellOptions/CellOptions';
import CommentComponent from './Comment/Comment';
import CellEditor from './CellEditor/CellEditor';
import { CustomElement } from './CellEditor/custom-types.d';

export interface CellComment {
  id: string;
  author: string;
  message: string;
  createdAt: Date;
  resolved: boolean;
}

export interface CellValue {
  id: number;
  blockContent: CustomElement[];
}

interface Props {
  cellValue?: CellValue | undefined;
  comments?: CellComment[];
}

function Cell({ cellValue, comments = [] }: Props) {
  const [value] = useState<CellValue | undefined>(cellValue);
  const [barVisible, setBarVisibility] = useState<boolean>(false);
  const [optionsVisible, setOptionsVisibility] = useState<boolean>(false);
  const [commentsVisible, setCommentsVisibility] = useState<boolean>(false);
  const [commentNotificationVisible, setCommentNotificationVisibility] = useState<boolean>(
    !!comments.length
  );
  const [cellComments, setCellCommentsState] = useState<CellComment[]>(comments);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCommentNotificationVisibility(!!cellComments.length);
  }, [cellComments]);

  const handleHover = (event: any) => {
    event.preventDefault();
    if (optionsVisible) return;
    setBarVisibility(event.type !== 'mouseleave');
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
      resolved: false
    };
    switch (menuItem.action) {
      case 'edit':
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
    <div className="relative" onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <div
        className={`${
          barVisible ? 'opacity-40' : 'opacity-0'
        } absolute flex justify-center transition ease-in-out -top-[7.5px] w-full z-10 ml-2 `}
      >
        <button
          type="submit"
          className="bg-slate-800 text-white rounded-full h-[15px] w-[15px] flex justify-center items-center"
        >
          <IoAdd />
        </button>
      </div>
      <div
        className={`${
          barVisible ? 'opacity-40' : 'opacity-0'
        } absolute flex justify-center transition ease-in-out -bottom-[7.5px] w-full z-10 ml-2 `}
      >
        <button
          type="submit"
          className="bg-slate-800 text-white rounded-full h-[15px] w-[15px] flex justify-center items-center"
        >
          <IoAdd />
        </button>
      </div>
      <div className="absolute w-[80px] h-full top-0 -left-[80px] flex justify-end">
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
          <div className="relative grow h-full flex flex-col items-center bg-slate-200 w-6 p-2 rounded-l transition ease-in-out">
            <button type="button" onClick={toggleOptions}>
              <BsThreeDotsVertical className="cursor-pointer" />
            </button>
            <div
              className={`absolute top-0 left-7 z-50 ${
                optionsVisible ? 'flex flex-col' : 'hidden'
              }`}
            >
              <CellOptions selectOption={selectOption} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full my-4">
        <div className="grow">
          <div className="overflow-clip" ref={editorRef}>
            <CellEditor blockContent={value?.blockContent} />
          </div>
          <div className={`pt-3 ${commentsVisible ? 'flex flex-col' : 'hidden'}`}>
            {cellComments.map((comment) => (
              <CommentComponent key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cell;
