import {ColorPicker} from "antd";
import styles from "./index.module.scss";
import {Color} from "@tiptap/extension-color";
import {TextStyle} from "@tiptap/extension-text-style";
import {useCallback, useEffect, useState} from "react";
import {Content, Editor, EditorContent, useEditor} from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import EmojiPicker from "emoji-picker-react";
import {CharacterCount} from "@tiptap/extension-character-count";


interface INTextEditor {
    id?: string;
    hide_header?: boolean;
    title?: string;
    placeholder?: string;
    height?: string;
    onChange?: (ev: string) => void;
    value?: string;
}

const NTextEditor = ({
                         id,
                         height,
                         placeholder,
                         hide_header,
                         title,
                         onChange,
                         value
                     }: INTextEditor) => {
    const [content, set_content] = useState<any>(``);

    const [is_input_focused, set_is_input_focused] = useState(false);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [openAttributeList, setOpenAttributeList] = useState(false);

    const editor = useEditor({
        extensions: [
            CharacterCount,
            Document,
            History,
            Paragraph,
            Text,
            Bold,
            Underline,
            Italic,
            Strike,
            Code,
            Color,
            TextStyle,
        ],
        content,
        onUpdate: ({editor}) => {
            set_content(editor?.getHTML());
            if (onChange) {
                onChange(editor?.getHTML() ?? "");
            }
        },
        onBlur: ({event}) => {
            event.stopPropagation();
            set_is_input_focused(false);
            // Close the emoji picker when the editor loses focus
            // setOpenAttributeList(false);
            // setOpenEmojiPicker(false);
        },
        onFocus: () => {
            set_is_input_focused(true);
        }
    }) as Editor;
    // if (!editor) return null;

    useEffect(() => {
        if (editor && editor.getHTML() !== value) {
            editor.commands.setContent(value as Content);
        }
    }, [value, editor]);

    return (
        <>
            {!hide_header ? (
                <header className={styles.linInputHeader}>
                    <div className={styles.title}>
                        <span className={styles.titleText}>{title}</span>
                    </div>
                </header>
            ) : null}

            <div style={{position: "relative"}}>

                <div className={styles.placeholder}>{placeholder}</div>

                <EditorContent
                    id={id}
                    onBlur={(ev) => {
                        set_is_input_focused(false);
                    }}
                    onFocus={() => set_is_input_focused(true)}
                    style={{maxHeight: height ?? "none"}}
                    className={`${styles.inputBox} ${is_input_focused ? styles.focusedInputBox : ""}`}
                    editor={editor}
                >
                    {" "}
                </EditorContent>
            </div>

            <div className={styles.optionsContainer}>
                <EditOptions editor={editor}/>
                <InsertAttributesOptions editor={editor}
                                         openEmojiPicker={openEmojiPicker}
                                         setOpenEmojiPicker={setOpenEmojiPicker}
                                         openAttributeList={openAttributeList}
                                         setOpenAttributeList={setOpenAttributeList}
                />
            </div>
        </>
    );
};


enum EeditOptions {
    bold,
    italics,
    underline,
    strike_through,
    text_color,
    user_attributes,
    emoticons,
}

const EditIcons = {
    [EeditOptions.bold]: <img alt={"bold"} src="/src/assets/text-editor/bold-icon.svg"/>,
    [EeditOptions.italics]: <img alt={"bold"} src="/src/assets/text-editor/italics-icon.svg"/>,
    [EeditOptions.underline]: <img alt={"bold"} src="/src/assets/text-editor/underline-icon.svg"/>,
    [EeditOptions.strike_through]: <img alt={"bold"} src="/src/assets/text-editor/strike-through-icon.svg"/>,
    [EeditOptions.text_color]: <img alt={"bold"} src="/src/assets/text-editor/text-color-icon.svg"/>,
    [EeditOptions.user_attributes]: <img alt={"bold"} src="/src/assets/text-editor/user-icon.svg"/>,
    [EeditOptions.emoticons]: <img alt={"bold"} src="/src/assets/text-editor/emoji-icon.svg"/>,
};

const EditOptions = ({editor}: any) => {
    const [openColorPicker, setOpenColorPicker] = useState(false);

    const toggleBold = useCallback(() => {
        editor?.chain().focus().toggleBold().run();
    }, [editor]);

    const toggleItalic = useCallback(() => {
        editor?.chain().focus().toggleItalic().run();
    }, [editor]);

    const toggleUnderline = useCallback(() => {
        editor?.chain().focus().toggleUnderline().run();
    }, [editor]);

    const toggleStrikeThrough = useCallback(() => {
        editor?.chain().focus().toggleStrike().run();
    }, [editor]);

    const toggleColor = useCallback(
        (color: string) => {
            if (editor?.chain().focus().setColor) editor?.chain().focus().setColor(color).run();
        },
        [editor]
    );

    return (
        <div>
            <div className={styles.editOptions}>
                <div className={styles.optionSection}>
                    <div
                        onClick={() => {
                            toggleBold();
                        }}
                    >
                        {EditIcons[EeditOptions.bold]}
                    </div>
                    <div onClick={() => toggleItalic()}>{EditIcons[EeditOptions.italics]}</div>
                    <div onClick={() => toggleUnderline()}>{EditIcons[EeditOptions.underline]}</div>
                    <div onClick={() => toggleStrikeThrough()}>{EditIcons[EeditOptions.strike_through]}</div>
                </div>

                <div className={styles.separator}></div>

                <div className={styles.optionSection}>
                    <div onClick={() => setOpenColorPicker((prev) => !prev)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_23373_198)">
                                <path
                                    d="M2.00016 16C1.81127 16 1.65305 15.936 1.5255 15.808C1.39794 15.68 1.33394 15.5218 1.3335 15.3333V14C1.3335 13.8111 1.3975 13.6529 1.5255 13.5253C1.6535 13.3978 1.81172 13.3338 2.00016 13.3333H14.0002C14.1891 13.3333 14.3475 13.3973 14.4755 13.5253C14.6035 13.6533 14.6673 13.8116 14.6668 14V15.3333C14.6668 15.5222 14.6028 15.6807 14.4748 15.8087C14.3468 15.9367 14.1886 16.0004 14.0002 16H2.00016ZM4.75016 11.3333C4.49461 11.3333 4.29172 11.2249 4.1415 11.008C3.99127 10.7911 3.96083 10.5607 4.05016 10.3167L6.9835 2.5C7.03905 2.34444 7.1335 2.22222 7.26683 2.13333C7.40016 2.04444 7.54461 2 7.70016 2H8.30016C8.46683 2 8.61416 2.04444 8.74216 2.13333C8.87016 2.22222 8.96172 2.34444 9.01683 2.5L11.9668 10.3333C12.0557 10.5778 12.0253 10.8056 11.8755 11.0167C11.7257 11.2278 11.5228 11.3333 11.2668 11.3333C11.1113 11.3333 10.9668 11.2889 10.8335 11.2C10.7002 11.1111 10.6057 10.9889 10.5502 10.8333L9.90016 8.93333H6.1335L5.45016 10.85C5.39461 11.0056 5.30283 11.1251 5.17483 11.2087C5.04683 11.2922 4.90483 11.3338 4.75016 11.3333ZM6.60016 7.6H9.40016L8.0335 3.73333H7.96683L6.60016 7.6Z"
                                    fill={editor?.getAttributes("textStyle")?.color || "black"}
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_23373_198">
                                    <rect width="16" height="16"
                                          fill={editor?.getAttributes("textStyle")?.color || "black"}/>
                                </clipPath>
                            </defs>
                        </svg>

                        <div style={{visibility: "hidden", maxWidth: "0px"}}>
                            <ColorPicker open={openColorPicker}
                                         onChangeComplete={(color) => toggleColor(color.toHexString())}
                                         defaultValue="#1677ff" size="small"/>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.49738 9.91379L4.08651 6.50292C4.04526 6.46177 4.01714 6.40931 4.00572 6.35218C3.99429 6.29505 4.00007 6.23581 4.02233 6.18197C4.04459 6.12812 4.08232 6.08209 4.13074 6.0497C4.17917 6.01731 4.23612 6.00001 4.29438 6H11.1173C11.1756 6.00001 11.2325 6.01731 11.281 6.0497C11.3294 6.08209 11.3671 6.12812 11.3894 6.18197C11.4116 6.23581 11.4174 6.29505 11.406 6.35218C11.3946 6.40931 11.3664 6.46177 11.3252 6.50292L7.91373 9.91379C7.85851 9.96899 7.78363 10 7.70555 10C7.62748 10 7.5526 9.96899 7.49738 9.91379Z"
                                fill={editor?.getAttributes("textStyle")?.color || "black"}
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InsertAttributesOptions = ({
                                     editor,
                                     openEmojiPicker,
                                     setOpenEmojiPicker,
                                     openAttributeList,
                                     setOpenAttributeList
                                 }: any) => {

    const toggleEmoji = (emoji: any) => {
        const abcd = `<span style="">&#x${emoji.unified}</span>`;
        editor?.commands?.insertContent(`${abcd}`);
        editor?.chain().focus();
    };

    const selectEmojis = (ev: any) => {
        editor?.chain().focus();
        setOpenEmojiPicker((prev: boolean) => !prev);
    };

    const selectAttributes = () => {
        editor?.chain().focus();
        setOpenAttributeList((prev: boolean) => !prev);
    };

    const addAttribute = (attribute: any) => {
        const abcd = `${attribute?.key}`;
        editor?.chain().focus();

        editor?.commands?.insertContent(`{{${abcd}}}`);
        editor?.chain().focus();
    }


    return (
        <div style={{position: "relative"}}>
            <div>
                <div className={styles.editOptions}>
                    <div className={styles.optionSection}>
                        <div onClick={(ev) => selectEmojis(ev)}>{EditIcons[EeditOptions.emoticons]}</div>
                        <div onClick={() => selectAttributes()}>{EditIcons[EeditOptions.user_attributes]}</div>
                    </div>
                </div>
            </div>
            <EmojiPicker
                autoFocusSearch={false} open={openEmojiPicker}
                style={{zIndex: 1, position: "absolute", right: 0, top: "50px"}}
                onEmojiClick={(emoji) => toggleEmoji(emoji)}/>

        </div>
    );
};


export default NTextEditor;
