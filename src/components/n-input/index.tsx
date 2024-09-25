import  { CSSProperties, ReactNode } from 'react';
import styles from './index.module.scss';

export function NInput(props: SInputProps) {
    return (
        <div className={styles.input} style={{ ...props.style, width: props.width }}>

            {props.label ? (
                <p className={styles.inputLabel} style={props.label_style}>
                    {props.label}
                </p>
            ) : null}

            <div className={styles.inputBoxContainer}>

                {props.prefix ? <div className={styles.inputPrefix}>
                    {props.prefix}
                </div> : null}


                <input
                    style={{ paddingLeft: props.leftIconSize, paddingRight: props.rightIconSize, textAlign: props.inputTextAlign  }}
                    id={props.id}
                    autoComplete={'off'}
                    type={props.inputType || 'text'}
                    disabled={props.disabled}
                    placeholder={props.placeholder || 'Enter Something'}
                    value={props.value}
                    onChange={(ev) => {
                        if (props.onChange) props.onChange(ev.target.value);
                    }}
                    onMouseDown={(event) => {
                        if(props.onClick) {
                            props.onClick(event)
                        }
                    }}
                />

                {props.suffix ? <div onClick={() => {
                    if (props.onSuffixClicked) {
                        props.onSuffixClicked();
                    }
                }} className={styles.inputSuffix}>
                    {props.suffix}
                </div> : null}

            </div>
        </div>
    );
}

interface SInputProps {
    id?: string;
    label?: string;
    label_style?: CSSProperties;
    width?: number | string;
    placeholder?: string;
    disabled?: boolean;
    style?: CSSProperties;
    value?: string | number;
    is_full_width?: boolean;
    suffix?: ReactNode;
    prefix?: ReactNode;
    onChange?: (value: string) => void;
    leftIconSize?: string;
    rightIconSize?: string;
    maxLength?: number;
    inputType?: string;
    onSuffixClicked?: () => void;
    inputTextAlign?: 'left' | 'right' | 'center';
    onClick?: (event: any) => void;
}
