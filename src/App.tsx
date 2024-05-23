import React, { useState } from 'react';
import './App.css';

function generateRandomSequence(
  start: number,
  end: number,
  peak: number,
  totalDays: number,
  peakDay: number
): number[] {
  const sequence: number[] = [];
  let currentValue = start;

  
  // Generate growth sequence from start to peak
  for (let i = 0; i < peakDay; i++) {
    sequence.push(Math.round(currentValue));
    const maxIncrement = (peak - currentValue) / (peakDay - i); // Limit the increment based on remaining days to peak
    const randomIncrement = Math.random() * maxIncrement;
    currentValue += randomIncrement;
    currentValue = Math.min(currentValue, peak);
  }

  currentValue = peak;

  // Generate decline sequence from peak to end
  const declineDays = totalDays - peakDay - 1;
  for (let i = 0; i < declineDays; i++) {
    sequence.push(Math.round(currentValue));
    const maxDecrement = (currentValue - end) / (declineDays - i); // Limit the decrement based on remaining days after peak
    const randomDecrement = Math.random() * maxDecrement;
    currentValue -= randomDecrement;
    currentValue = Math.max(currentValue, end);
  }

  sequence.push(end); // Ensure the sequence ends with the end value

  return sequence;
}

function App() {
	const [startValue, setStartValue] = useState<number>(0);
	const [endValue, setEndValue] = useState<number>(0);
	const [peakValue, setPeakValue] = useState<number>(0);
	const [totalDays, setTotalDays] = useState<number>(0);
	const [peakDay, setPeakDay] = useState<number>(0);
	const [sequence, setSequence] = useState<number[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = generateRandomSequence(startValue, endValue, peakValue, totalDays, peakDay);
    setSequence(result);
  };

  const copyToClipboard = () => {
    const values = sequence.join('\t'); // Join values with tabs
    const textarea = document.createElement('textarea'); // Create a textarea element
    textarea.value = values; // Set textarea value to the sequence
    document.body.appendChild(textarea); // Append textarea to the document body
    textarea.select(); // Select the textarea text
    document.execCommand('copy'); // Copy the selected text
    document.body.removeChild(textarea); // Remove the textarea from the document body
  };

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="startValue">Start Value:</label>
					<input
						type="number"
						id="startValue"
						value={startValue}
						onChange={(e) => setStartValue(parseInt(e.target.value))}
						required
					/>
				</div>
        <div>
					<label htmlFor="peakValue">Peak Value:</label>
					<input
						type="number"
						id="peakValue"
						value={peakValue}
						onChange={(e) => setPeakValue(parseInt(e.target.value))}
						required
					/>
				</div>
				<div>
					<label htmlFor="endValue">End Value:</label>
					<input
						type="number"
						id="endValue"
						value={endValue}
						onChange={(e) => setEndValue(parseInt(e.target.value))}
						required
					/>
				</div>
				<div>
					<label htmlFor="totalDays">Total Days:</label>
					<input
						type="number"
						id="totalDays"
						value={totalDays}
						onChange={(e) => setTotalDays(parseInt(e.target.value))}
						required
					/>
				</div>
				<div>
					<label htmlFor="peakDay">Peak Day:</label>
					<input
						type="number"
						id="peakDay"
						value={peakDay}
						onChange={(e) => setPeakDay(parseInt(e.target.value))}
						required
					/>
				</div>
				<button type="submit">Generate Sequence</button>
			</form>
      {sequence.length > 0 && (
        <div>
          <h3>Generated Sequence:</h3>
          <pre>{sequence.join(', ')}</pre>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
		</div>
	);
}

export default App;
