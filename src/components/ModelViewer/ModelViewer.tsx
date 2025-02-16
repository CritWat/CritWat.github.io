import {useEffect, useRef} from 'react';

export default function ModelViewer() {
    const init = useRef(false);
    useEffect(() => {
        if (!init.current) {
        // Ensure the script is loaded before using it
        // @ts-ignore
        if (window.StlViewer) {
            // @ts-ignore
            new window.StlViewer(document.getElementById('stl_cont'),
                {
                    auto_resize: false,
                    zoom: -5000,
                    models: [{ id: 0, filename: '/models/prometheus_award.stl', rotationx: -90 }]
                }
            );
        }
        init.current = true;
        }
    }, []);

    return <div id="stl_cont" style={{ width: '600px', height: '400px' }}></div>;
};