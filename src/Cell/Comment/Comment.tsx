import { useEffect, useState } from 'react';
import { CellComment } from '../Cell';

interface Props {
  comment: CellComment;
}

function CommentComponent({ comment }: Props) {
  const [howLong, setHowLong] = useState<string>('Just now');

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = (new Date().getTime() - comment.createdAt.getTime()) / 1000;
      if (seconds < 60) {
        setHowLong('Less than a minute');
      } else if (seconds < 3600) {
        setHowLong(`${Math.round(seconds / 60)} minutes ago`);
      } else {
        setHowLong(`${Math.round(seconds / 3600)} hours ago`);
      }
    }, 60000);
    return () => clearInterval(interval);
  });

  return (
    <div className="bg-yellow-100 p-2">
      <div className="flex items-center">
        <div>{comment.author}</div>
        <div className="ml-4 text-sm opacity-70">{howLong}</div>
      </div>
      <div>{comment.message}</div>
    </div>
  );
}

export default CommentComponent;
