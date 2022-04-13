/* eslint-disable react/jsx-props-no-spreading */
import { useCallback } from 'react';
import { RenderElementProps } from 'slate-react';

export function H1Element({ attributes, children }: RenderElementProps) {
  return (
    <h1 className="text-6xl" {...attributes}>
      {children}
    </h1>
  );
}

export function DefaultElement({ attributes, children }: RenderElementProps) {
  return <p {...attributes}>{children}</p>;
}

function useRenderElements() {
  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'heading-one':
        return <H1Element {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  return renderElement;
}

export default useRenderElements;
