/* eslint-disable react/jsx-props-no-spreading */
import { useCallback } from 'react';
import { RenderElementProps } from 'slate-react';

type CustomRenderElementProps = RenderElementProps & {
  headingNumber: number;
};

function HeadingElement({ attributes, children, headingNumber }: CustomRenderElementProps) {
  switch (headingNumber) {
    case 6:
      return <h6 {...attributes}>{children}</h6>;
    case 5:
      return <h5 {...attributes}>{children}</h5>;
    case 4:
      return <h4 {...attributes}>{children}</h4>;
    case 3:
      return <h3 {...attributes}>{children}</h3>;
    case 2:
      return <h2 {...attributes}>{children}</h2>;
    default:
      return <h1 {...attributes}>{children}</h1>;
  }
}

function ListElement({ attributes, children }: RenderElementProps) {
  return <li {...attributes}>{children}</li>;
}

function BlockQuoteElement({ attributes, children }: RenderElementProps) {
  return (
    <blockquote {...attributes} className="border-l-4 border-white-600/30 pl-4 ml-2">
      {children}
    </blockquote>
  );
}

function DefaultElement({ attributes, children }: RenderElementProps) {
  return <p {...attributes}>{children}</p>;
}

function useRenderElements() {
  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'heading-one':
        return <HeadingElement {...props} headingNumber={1} />;
      case 'heading-two':
        return <HeadingElement {...props} headingNumber={2} />;
      case 'heading-three':
        return <HeadingElement {...props} headingNumber={3} />;
      case 'heading-four':
        return <HeadingElement {...props} headingNumber={4} />;
      case 'heading-five':
        return <HeadingElement {...props} headingNumber={5} />;
      case 'heading-six':
        return <HeadingElement {...props} headingNumber={6} />;
      case 'list-item':
        return <ListElement {...props} />;
      case 'block-quote':
        return <BlockQuoteElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  return renderElement;
}

export default useRenderElements;
