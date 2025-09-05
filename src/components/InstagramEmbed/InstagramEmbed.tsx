import { useEffect, useRef } from "react";

export function InstagramEmbed({ url }: { url: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // @ts-ignore
        if (window.instgrm) {
            // @ts-ignore
            window.instgrm.Embeds.process();
        }
    }, [url]);

    return (
        <div ref={ref}>
            <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
            ></blockquote>
        </div>
    );
}
