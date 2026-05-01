import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FoodAnalysisResult } from '../types/food';
import { createFoodPlate, createNutritionDisplay, createBackgroundEnvironment } from '../utils/foodModels';
import styles from './ARViewer.module.css';

interface ARViewerProps {
    foodData: FoodAnalysisResult;
    onClose: () => void;
}

export const ARViewer: React.FC<ARViewerProps> = ({ foodData, onClose }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const modelRef = useRef<THREE.Group | null>(null);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        // Add environment
        const env = createBackgroundEnvironment();
        scene.add(env);

        // Camera setup
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // Create 3D models
        const foodPlate = createFoodPlate();
        foodPlate.position.y = -0.5;
        scene.add(foodPlate);

        const nutritionDisplay = createNutritionDisplay(
            foodData.name,
            foodData.calories?.toString(),
            foodData.protein,
            foodData.carbs,
            foodData.fat
        );
        nutritionDisplay.position.z = 2.5;
        nutritionDisplay.position.y = 1;
        scene.add(nutritionDisplay);

        modelRef.current = foodPlate;

        // Animation loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            frameRef.current++;

            if (modelRef.current) {
                modelRef.current.rotation.x += 0.005;
                modelRef.current.rotation.y += 0.01;
            }

            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            const newWidth = containerRef.current?.clientWidth || width;
            const newHeight = containerRef.current?.clientHeight || height;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (containerRef.current && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [foodData]);

    return (
        <div className={styles.arContainer}>
            <div ref={containerRef} className={styles.canvas} />

            <button className={styles.closeButton} onClick={onClose}>
                ← Back to Results
            </button>

            <div className={styles.info}>
                <h3>{foodData.name}</h3>
                <p>✨ Rotate your device to view the food in 3D</p>
            </div>

            <div className={styles.nutritionCard}>
                <div className={styles.nutritionRow}>
                    <span>Calories</span>
                    <strong>{foodData.calories || 'N/A'}</strong>
                </div>
                {foodData.protein && (
                    <div className={styles.nutritionRow}>
                        <span>Protein</span>
                        <strong>{foodData.protein}</strong>
                    </div>
                )}
                {foodData.carbs && (
                    <div className={styles.nutritionRow}>
                        <span>Carbs</span>
                        <strong>{foodData.carbs}</strong>
                    </div>
                )}
                {foodData.fat && (
                    <div className={styles.nutritionRow}>
                        <span>Fat</span>
                        <strong>{foodData.fat}</strong>
                    </div>
                )}
            </div>
        </div>
    );
};
