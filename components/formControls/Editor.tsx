import React from 'react';
import { useQuill } from 'react-quilljs';

interface IProp {
    intialValue?: string,
    width?: number,
    height?: number
}

export const Editor = ({ intialValue, width, height }: IProp) => {
    const { quill, quillRef } = useQuill();

    console.log(quill);    // undefined > Quill Object
    console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

    if (intialValue) {
        React.useEffect(() => {
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(intialValue);
            }
        }, [quill]);
    }

    return (
        <div style={{ width: width ? width : 500, height: height ? height : 300 }}>
            <div ref={quillRef} />
        </div>
    );
}
