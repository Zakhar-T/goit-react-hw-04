import styles from './Feedback.module.css';

export default function Feedback({ clicks, total, positivePercent }) {
  return (
    <ul className={styles.feedback}>
      <li>Good: {clicks.good}</li>
      <li>Neutral: {clicks.neutral}</li>
      <li>Bad: {clicks.bad}</li>
      <li>Total: {total}</li>
      <li>Positive: {positivePercent}%</li>
    </ul>
  );
}
