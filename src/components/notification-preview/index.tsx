import {useEffect, useState} from "react";
import styles from './index.module.scss'

interface ITemplate {
    large_icon_url?: string;
    banner_image_url?: string;
    favicon_url?: string;
    company_name?: string;
    btn_1_label?: string;
    btn_2_label?: string;
    dismiss_btn_label?: string;
}

const PushAppTemplatePreview = ({template = {}}: ITemplate) => {
    const [show_large_icon, set_show_large_icon] = useState(false);
    const [show_banner_image, set_show_banner_image] = useState(false);
    const [show_favicon, set_show_favicon] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.onload = function () {
            set_show_large_icon(true);
        };
        image.onerror = function () {
            set_show_large_icon(false);
        };
        image.src = template.large_icon_url ?? "";
    }, [template.large_icon_url]);

    useEffect(() => {
        const image = new Image();
        image.onload = function () {
            set_show_banner_image(true);
        };
        image.onerror = function () {
            set_show_banner_image(false);
        };
        image.src = template.banner_image_url ?? "";
    }, [template.banner_image_url]);

    useEffect(() => {
        const image = new Image();
        image.onload = function () {
            set_show_favicon(true);
        };
        image.onerror = function () {
            set_show_favicon(false);
        };
        image.src = template.favicon_url ?? "";
    }, [template.favicon_url])

    return (
        <>

            <div className={styles.previewSection}>
                <img src="/src/assets/text-editor/mobile-preview-icon.svg"/>


                <div className={styles.notificationPreview}>

                    <div style={{background: template?.background_color ?? "white"}} className={styles.notificationContainer}>

                        <section className={styles.notificationHeaderSection}>
                            <img width={20} height={20} src={template.favicon_url}/>

                            <label>{template.company_name}</label>
                            {template?.company_name ? <label style={{fontWeight: 600, fontSize: "16px"}}>•</label> : null}

                            <div
                                dangerouslySetInnerHTML={{__html: template?.subtitle ?? ""}}/>
                            {template?.subtitle ? <label style={{fontWeight: 600, fontSize: "16px"}}>•</label> : null}

                            <label>51m</label>
                            <img className={styles.vectorUp} src="/src/assets/common/up_chevron.svg"/>
                        </section>

                        <section className={styles.notificationBodySection}>
                            <div>
                                <div className={styles.notificationTitle}
                                     dangerouslySetInnerHTML={{__html: template?.title ?? ""}}/>
                                <div className={styles.notificationBody}
                                     dangerouslySetInnerHTML={{__html: template?.body ?? ""}}/>
                            </div>

                            {show_large_icon ?
                                <img src={template?.large_icon_url}/> : null}
                        </section>

                        {show_banner_image ? (
                            <section className={styles.notificationBannerSection}>
                                <img src={template?.banner_image_url}/>{" "}
                            </section>
                        ) : null}

                        {template?.btn_1_label || template?.btn_2_label || template?.dismiss_btn_label ? (
                            <section className={styles.notificationBtnSection}>
                                {template?.btn_1_label ? <label
                                    dangerouslySetInnerHTML={{__html: template?.btn_1_label}}></label> : null}
                                {template?.btn_2_label ?
                                    <label dangerouslySetInnerHTML={{__html: template?.btn_2_label}}></label> : null}
                                {template?.dismiss_btn_label ? <label
                                    dangerouslySetInnerHTML={{__html: template?.dismiss_btn_label}}></label> : null}
                            </section>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PushAppTemplatePreview;