import { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, STLExporter, useLoader } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function STLViewer({ url }) {
    const meshRef = useRef();
    const { scene } = useThree();
    const geometry = useLoader(STLLoader, url);

    const handleExport = () => {
        const exporter = new STLExporter();
        const result = exporter.parse(scene);
        const blob = new Blob([result], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'model.stl');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 1, 2]} intensity={1} />
            <mesh ref={meshRef} geometry={geometry}>
                <meshStandardMaterial color="lightblue" />
            </mesh>
            <OrbitControls />
            <button onClick={handleExport}>Export STL</button>
        </Canvas>
    );
}

export default STLViewer;