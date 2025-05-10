import styles from './Options.module.css';

export default function Options({ updateState, votes }) {
  return (
    <div className={styles.options}>
      <button onClick={() => updateState('good')}>Good</button>
      <button onClick={() => updateState('neutral')}>Neutral</button>
      <button onClick={() => updateState('bad')}>Bad</button>
      {Boolean(votes) && (
        <button onClick={() => updateState('reset')}>Reset</button>
      )}
    </div>
  );
}
