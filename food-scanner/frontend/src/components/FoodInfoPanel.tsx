import { FoodAnalysisResult } from '../types/food';
import styles from './FoodInfoPanel.module.css';

interface FoodInfoPanelProps {
    data: FoodAnalysisResult;
    onScanAnother: () => void;
    onViewAR?: () => void;
}

export const FoodInfoPanel: React.FC<FoodInfoPanelProps> = ({ data, onScanAnother, onViewAR }) => {
    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <h1 className={styles.title}>{data.name}</h1>

                {data.price && <p className={styles.price}>{data.price}</p>}

                {data.ingredients && data.ingredients.length > 0 && (
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Ingredients</h3>
                        <div className={styles.ingredientsList}>
                            {data.ingredients.map((ingredient, idx) => (
                                <span key={idx} className={styles.ingredient}>
                                    {ingredient}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className={styles.nutrition}>
                    {data.calories && (
                        <div className={styles.nutritionItem}>
                            <span className={styles.label}>Calories</span>
                            <span className={styles.value}>{data.calories}</span>
                        </div>
                    )}
                    {data.protein && (
                        <div className={styles.nutritionItem}>
                            <span className={styles.label}>Protein</span>
                            <span className={styles.value}>{data.protein}</span>
                        </div>
                    )}
                    {data.carbs && (
                        <div className={styles.nutritionItem}>
                            <span className={styles.label}>Carbs</span>
                            <span className={styles.value}>{data.carbs}</span>
                        </div>
                    )}
                    {data.fat && (
                        <div className={styles.nutritionItem}>
                            <span className={styles.label}>Fat</span>
                            <span className={styles.value}>{data.fat}</span>
                        </div>
                    )}
                </div>

                {data.confidence && (
                    <p className={styles.confidence}>Confidence: {(data.confidence * 100).toFixed(0)}%</p>
                )}

                <div className={styles.buttonGroup}>
                    {onViewAR && (
                        <button className={styles.arButton} onClick={onViewAR}>
                            🕶️ View in AR
                        </button>
                    )}
                    <button className={styles.scanButton} onClick={onScanAnother}>
                        Scan Another Dish
                    </button>
                </div>
            </div>
        </div>
    );
};
