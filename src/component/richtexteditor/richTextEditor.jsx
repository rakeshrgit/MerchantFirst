import React, {useState, useRef, useMemo} from 'react';
import JoditEditor from "jodit-react";
const RichTextEditor = () =>{
    const editor = useRef(null);
    return (
        <div>
            <JoditEditor ref={editor}/>
        </div>
    )
}

export default RichTextEditor;