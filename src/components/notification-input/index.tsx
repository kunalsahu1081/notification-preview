import styles from './index.module.scss'
import {useEffect, useState} from "react";

interface IPushAppTemplateInputSection {
    onTemplateChange: (template: any) => void;
}

const PushAppTemplateInputSection = ({onTemplateChange}: IPushAppTemplateInputSection) => {


    const [template_info, set_template_info] = useState({});


    const image_upload = (e: any) => {
        const file = e?.target?.files && e?.target?.files?.length > 0 ? e?.target?.files[0] : e;
        const file_name = file?.name;

        const reader = new FileReader();

        reader.onerror = (error) => {
            console.log("Error occurred in Uploading File", error);
        };

        reader.readAsDataURL(file);

        return {reader, file_name}
    };

    const banner_upload = (e: any) => {
        const {reader, file_name} = image_upload(e);

        reader.onloadend = () => {
            const url = reader.result as string;

            set_template_info((prev) => ({
                ...prev, banner_image_url: url,
                banner_file_name: file_name,
            }));
        }
    };

    const large_icon_upload = (e: any) => {
        const {reader, file_name} = image_upload(e);

        reader.onloadend = () => {
            const url = reader.result as string;

            set_template_info((prev) => ({
                ...prev, large_icon_url: url,
                large_icon_file_name: file_name,
            }));
        }
    };

    const favicon_upload = (e: any) => {
        const {reader, file_name} = image_upload(e);

        reader.onloadend = () => {
            const url = reader.result as string;

            set_template_info((prev) => ({
                ...prev, favicon_image_url: url,
                favicon_file_name: file_name,
            }));
        }

    };

    useEffect(() => {
        onTemplateChange(template_info);
    }, [template_info]);


    return (
        <div className={styles.InputArea}>

        </div>
    );
};

export default PushAppTemplateInputSection;
