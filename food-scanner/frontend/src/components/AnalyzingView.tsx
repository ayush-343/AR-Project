import styles from './AnalyzingView.module.css';

export const AnalyzingView: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.spinner} />
                <p className={styles.text}>Analyzing food...</p>
                <p className={styles.subtext}>Using AI to extract details</p>
            </div>
        </div>
    );
};
