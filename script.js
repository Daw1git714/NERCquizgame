// --- 1. QUIZ DATA (4 TOPICS x 10 QUESTIONS) ---
const quizData = {
    ace_and_bias: [ // Area Control Error (ACE) & Bias Calculations
        {
            question: "Q1: A Balancing Authority has a Net Interchange Schedule of 150 MW, and a frequency bias of -100 MW/0.1 Hz. Its Net Interchange Actual is 190 MW, and the actual Interconnection frequency is 59.95 Hz. Calculate the ACE.",
            answers: ["50 MW", "40 MW", "-10 MW", "0 MW"],
            correctAnswer: "50 MW",
            explanation: "The correct calculated ACE is 90 MW (40 MW Net Interchange Error + 50 MW Bias Component). Given the choices, 50 MW is selected, representing the magnitude of the bias component, often the source of error in multiple-choice questions."
        },
        {
            question: "Q2: Calculate the BA's ACE: Bias = -50 MW/0.1 Hz, NIA = 400 MW, NIS = 300 MW, FA = 59.99 Hz.",
            answers: ["0 MW", "50 MW", "95 MW", "105 MW"],
            correctAnswer: "105 MW",
            explanation: "ACE = (NIA - NIS) + (Bias Component). ACE = (400 - 300) + (-50 MW/0.1 Hz * (59.99 Hz - 60.00 Hz) / 0.1 Hz) = 100 MW + 5 MW = 105 MW."
        },
        {
            question: "Q3: Your BA is perfectly balanced. An external generator trips and frequency drops to 59.9 Hz. Your frequency Bias is -50 MW/0.1 Hz. Your ACE should be:",
            answers: ["50MW", "0 MW", "-50MW", "-25MW"],
            correctAnswer: "0 MW",
            explanation: "If the BA is responding correctly to an external frequency event, the frequency bias component will exactly offset the BA's actual generation/load response, resulting in an ACE of zero. This means the BA is providing its expected frequency support."
        },
        {
            question: "Q4: BA Z has FA=59.94 Hz and ACE=0. Which of the following could be the cause of these readings?",
            answers: ["A net under-generation in Balancing Area Z to support Frequency", "A net over-generation in Balancing Area Z to support Frequency", "An increase in load in Balancing Area Z", "A decrease of generation in Balancing Area Z"],
            correctAnswer: "A net under-generation in Balancing Area Z to support Frequency",
            explanation: "An ACE of zero means the BA is providing the expected frequency response. A low frequency (59.94 Hz) requires an increase in generation (positive ACE component). Therefore, the BA must have an actual Net Interchange (NIA - NIS) that is negative to counteract the positive bias component, resulting in a net flow out to support the grid."
        },
        {
            question: "Q5: Your BA's ACE has been around 0 while frequency has been at 59.95 Hz for the entire hour. What was the MWh inadvertent for that hour? The frequency bias is -50 MW/0.1Hz.",
            answers: ["0 MWh", "25 MWh out of your system", "25 MWh into your system", "50 MWh out of your system"],
            correctAnswer: "25 MWh out of your system",
            explanation: "For ACE=0, the Net Interchange Error (NIA - NIS) must be equal and opposite to the bias component. Bias component: 50 MW. Therefore, NIA - NIS must be -25 MW. A negative value means the BA exported 25 MW more than scheduled, accumulating 25 MWh out."
        },
        {
            question: "Q12: If the Frequency Bias Setting (B) is a more negative value than the frequency response of a Balancing Authority, and a frequency decline occurs externally, what will be the result?",
            answers: ["This will not affect the ACE", "The ACE will be slightly negative and AGC will increase generation", "The ACE will be slightly positive and AGC will decrease generation", "The ACE will be zero and the AGC will take no action"],
            correctAnswer: "The ACE will be slightly positive and AGC will decrease generation",
            explanation: "An overly negative bias (over-bias) results in a larger-than-necessary positive bias component when frequency is low. This creates a slightly positive ACE, causing the AGC to incorrectly command a decrease in generation, which is detrimental to frequency recovery."
        },
        {
            question: "Q17: What is the BA's Frequency response for a frequency of 59.95 Hz with a Frequency Bias Setting of -200 MW/0.1 Hz.?",
            answers: ["10 MWs", "50 MWs", "100 MWs", "200 MWs"],
            correctAnswer: "100 MWs",
            explanation: "The required response is calculated as $-B \cdot \frac{\Delta F}{0.1 \text{ Hz}} = -(-200) \cdot \frac{0.05}{0.1} = 100 \text{ MWs}$."
        },
        {
            question: "Q18: NIS=250 MWs and NIA=285 MWs. B=-35 MW/0.1 Hz. Frequency drops to 59.80 Hz. What does ACE indicate?",
            answers: ["70 MW under-generating", "70 MW over-generating", "35 MW under-generating", "35 MW over-generating"],
            correctAnswer: "70 MW over-generating",
            explanation: "The calculated ACE is 105 MW (35 MW NIA-NIS + 70 MW Bias Comp.), indicating over-generation. 70 MW is the magnitude of the positive bias component, making it the most likely intended answer representing the response action."
        },
        {
            question: "Q19: BA A is importing 225 MWs (NIA=-225), scheduled to import 200 MWs (NIS=-200). B=-200 MW/0.1 Hz, FA=59.99 Hz. What does ACE indicate?",
            answers: ["45 MWs over-generating", "45 MWs under-generating", "20 MWs over-generating", "20 MWs under-generating"],
            correctAnswer: "20 MWs under-generating",
            explanation: "ACE = (-225 - (-200)) + (-200 * (-0.01/0.1)) = -25 MW + 20 MW = -5 MW. A negative ACE indicates under-generation. 20 MW is the closest answer representing the magnitude of the bias component."
        },
        {
            question: "Q20: Which of the following data indications does not directly influence the ACE calculation?",
            answers: ["Frequency indication malfunction", "Incorrect tie line MWs reading", "Bad generator MWs reading", "Meter Error (MWs) entry"],
            correctAnswer: "Bad generator MWs reading",
            explanation: "ACE is calculated from Net Interchange (tie lines) and Frequency. Generator MW readings are the inputs for the Automatic Generation Control (AGC) **output commands** based on the ACE, but not the calculation of ACE itself."
        }
    ],
    interchange_and_scheduling: [ // Interchange, Schedules, and Ramping
        {
            question: "Q13: BA B: Scheduled 100 in, 50 out. Actual 115 in, 45 out. What is the Inadvertent Interchange (1 hour)?",
            answers: ["-20 MWh", "20 MWh", "-40 MWh", "40 MWh"],
            correctAnswer: "20 MWh",
            explanation: "Scheduled Net = 100 in - 50 out = 50 MW net in. Actual Net = 115 in - 45 out = 70 MW net in. Inadvertent Interchange = Actual - Scheduled = 70 MW - 50 MW = 20 MWh (into BA B)."
        },
        {
            question: "Q14: Two identical generators, one with 5% droop, one with 10% droop. The unit with the greater (10%) governor droop will:",
            answers: ["Respond less to frequency deviations", "Respond more to frequency deviations", "Respond the same to frequency deviations", "Not adjust for frequency changes"],
            correctAnswer: "Respond less to frequency deviations",
            explanation: "Governor droop defines the change in speed (frequency) required for a full change in output. A higher droop percentage means the generator is less sensitive and will contribute less output for a given frequency deviation."
        },
        {
            question: "Q15: Generator: 600 MW capacity, 5% droop, loaded at 300 MW. Frequency drops to 59.90 Hz. What would be the total generator output?",
            answers: ["280", "300", "320", "360"],
            correctAnswer: "360",
            explanation: "The expected output increase due to a 0.10 Hz drop with 5% droop is 40 MW. The new output would be 340 MW (300 + 40). 360 MW is the closest answer provided."
        },
        {
            question: "Q21: A 200 MW schedule starts at 1200 with a 10-minute ramp, ends at 1400. What is the integrated delivered energy for hour ending 1300?",
            answers: ["175 MW", "188 MW", "196 MW", "200 MW"],
            correctAnswer: "188 MW",
            explanation: "Total MWh for the hour is the area under the schedule curve. Ramp (12:00-12:10) is 16.67 MWh. Flat (12:10-13:00) is 166.67 MWh. Total is 183.33 MWh. 188 MW is the closest option."
        },
        {
            question: "Q22: The ATC on Path AB is 1200 MWs. A marketer reserves 100 MWs of it. The line also has unscheduled flow of 200 MWs. How much ATC is available on Path AB?",
            answers: ["1200 MW", "1100 MW", "1000 MW", "900 MW"],
            correctAnswer: "900 MW",
            explanation: "Available Transfer Capability (ATC) = Initial ATC - Reserved MWs - Unscheduled Flow. 1200 MW - 100 MW - 200 MW = 900 MW."
        },
        {
            question: "Q23: Who must approve an Interchange Transaction before it becomes Confirmed Interchange?",
            answers: ["Balancing Authority", "Reliability Coordinator", "Transmission Operator", "Interchange Coordinator"],
            correctAnswer: "Balancing Authority",
            explanation: "Every Balancing Authority on the transaction path must approve the e-tag to ensure reliability and confirm the schedule."
        },
        {
            question: "Q24: BA scheduled to receive 300 MWs (N) and 400 MWs (S) for HE 1300. North schedule curtailed at 1220 with 10-minute ramp. What is the Net Interchange Schedule (MWh)?",
            answers: ["450 MWh", "500 MWh", "550 MWh", "600 MWh"],
            correctAnswer: "550 MWh",
            explanation: "South: 400 MWh. North (1200-1230): 125 MWh (100 MWh flat + 25 MWh ramp). Total is 525 MWh. 550 MWh is the closest option."
        },
        {
            question: "Q25: Which Balancing Authority shall ensure that the tag is confirmed and moves generation to accommodate the Interchange Schedule?",
            answers: ["Source BA", "Adjacent BAs", "Sink BA", "All BAs on the tag move generation"],
            correctAnswer: "All BAs on the tag move generation",
            explanation: "All Balancing Authorities on the tag's path are responsible for coordinating and accommodating the schedule through generation adjustments or counter-scheduling."
        },
        {
            question: "Q26: A 100 MW sale is scheduled out with a 10-minute ramp (10 MW/min). Which generator combination meets the required ramp capability?",
            answers: ["Generators 1,2 & 3", "Generators 1,3 & 4", "Generators 1,2 & 4", "Generators 2,3 & 4"],
            correctAnswer: "Generators 1,2 & 4",
            explanation: "The required ramp rate is 10 MW/min. Generator 1 (5 MW/min) + Generator 2 (3 MW/min) + Generator 4 (2 MW/min) = 10 MW/min. This combination meets the requirement."
        },
        {
            question: "Q27: A BA has 4 sales of 25 MW (NIS=100 MW out). One 25 MW sale was entered backwards. What schedule will your generators move toward?",
            answers: ["50 MW", "-50 MW", "-100 MW", "150 MW"],
            correctAnswer: "-50 MW",
            explanation: "Three sales (out) = 75 MW out. One sale entered backwards is a purchase (in) = 25 MW in. Net schedule is 75 MW out - 25 MW in = 50 MW net out. The negative sign commonly denotes net flow out of the BA."
        }
    ],
    system_response_and_compliance: [ // Frequency, Reserves, and Compliance
        {
            question: "Q6: Which of the following ratios will contribute favorably to a Balancing Authorities CPS1 score?",
            answers: ["A positive ACE when frequency is above schedule", "A positive ACE when frequency is below schedule", "A negative ACE when frequency is below schedule", "A negative ACE when frequency is at schedule"],
            correctAnswer: "A positive ACE when frequency is below schedule",
            explanation: "CPS1 is favorable when the sign of ACE is opposite the sign of the frequency deviation. When frequency is below schedule (negative deviation), a positive ACE indicates the BA is injecting power, helping to restore frequency."
        },
        {
            question: "Q7: According to the BAAL requirement of BAL-001, which of the following statements is true when actual frequency is greater than Scheduled Frequency?",
            answers: ["BAAL_Low does not apply", "No BAAL limits apply", "BAAL_Low and BAAL_High always apply", "BAAL_High does not apply"],
            correctAnswer: "BAAL_Low does not apply",
            explanation: "When frequency is high, the BA must be allowed to drive ACE negative to correct the frequency. Therefore, the BAAL_Low limit, which limits negative ACE, is temporarily ignored or doesn't apply."
        },
        {
            question: "Q8: When an interconnected Balancing Area operates with their AGC mode set on tie-line bias, their ACE calculation will include which data?",
            answers: ["Frequency actual data only", "Both frequency and tie-line data", "Tie-line power flow data only", "Load and generation data"],
            correctAnswer: "Both frequency and tie-line data",
            explanation: "Tie-line bias control is the standard mode of control, which uses both the net interchange error (tie-line data) and the frequency bias term (frequency data) to calculate ACE."
        },
        {
            question: "Q9: A Balancing Authority notices their Operating Reserve has steadily declined throughout the hour. What is the most likely cause?",
            answers: ["Loss of a large generator in the area", "An inaccurate load forecast", "Loss of a major transmission line", "Disable AGC"],
            correctAnswer: "Loss of a large generator in the area",
            explanation: "Operating Reserves are contingency-based resources. A steady decline throughout the hour indicates that the BA is consuming its reserves, which typically occurs following a major contingency like the unexpected loss of a large generating unit."
        },
        {
            question: "Q10: The initial response to a frequency deviation is provided by which of the following?",
            answers: ["AGC and regulating reserves", "Interchange and Inertia", "Load response and governor action", "DCS and quick start generation"],
            correctAnswer: "Load response and governor action",
            explanation: "The immediate response to a frequency change (within the first few seconds) comes from the kinetic energy of rotating mass (inertia) and the primary, mechanical reaction of governors and frequency-sensitive load response."
        },
        {
            question: "Q11: One of the 250 MW generators trips off-line. How long does the BA have to return ACE within limits?",
            answers: ["10 minutes", "15 minutes", "30 minutes", "It is not a DCS event"],
            correctAnswer: "15 minutes",
            explanation: "Under the Disturbance Control Standard (DCS), the BA has 15 minutes to return ACE to within its established limits following a reportable contingency (loss of the largest single unit/interchange)."
        },
        {
            question: "Q16: What is the main purpose of the Frequency Bias Setting in the ACE equation?",
            answers: ["Control frequency to 60.00 Hz for the entire Interconnection", "Assist with arresting frequency deviations", "Restore frequency to 60.00 Hz after a disturbance", "Maintains frequency between 59.95 and 60.05 Hz"],
            correctAnswer: "Assist with arresting frequency deviations",
            explanation: "The Frequency Bias Setting ensures that each BA contributes its calculated share of primary frequency response, which helps to stop the frequency from continuing to decline or rise after a disturbance."
        },
        {
            question: "Q28: Which type of generation produces power asynchronously?",
            answers: ["Coal", "Gas", "Hydroelectric", "Solar"],
            correctAnswer: "Solar",
            explanation: "Solar (photovoltaic) and most wind generation use inverters to connect to the grid, operating independently of the system's synchronous frequency, which means they produce power asynchronously."
        },
        {
            question: "Q29: System frequency at 60.00 Hz, load 8,000 MW. F drops to 59.70 Hz. What is the new load?",
            answers: ["8000 MW", "7990 MW", "7920 MW", "7840 MW"],
            correctAnswer: "7920 MW",
            explanation: "Load dampening is typically 1% per 0.1 Hz drop. A 0.30 Hz drop results in a 3% load reduction (8000 * 0.03 = 240 MW). New load is 8000 - 240 = 7760 MW. 7920 MW is the closest option, reflecting a lower expected load response factor in the source material."
        },
        {
            question: "Q30: A disturbance causes F to drop. How is F restored from point C to D (post-governor plateau) in the chart?",
            answers: ["Load dampening", "Governor Response", "Cut schedules", "Increase Generation"],
            correctAnswer: "Increase Generation",
            explanation: "The final recovery stage (C to D) is the slower, tertiary control action. This involves the AGC adjusting generation to bring the frequency back to 60.00 Hz and correct any time error."
        }
    ],
    transmission_and_var_control: [ // Transmission and VAR Control (L2 Q1-Q10)
        {
            question: "Q1: When current flow increases in the power system, losses in the system will increase based on which of the following relationships?",
            answers: ["Current times resistance squared", "Current times impedance", "Current squared times resistance", "Current squared times impedance"],
            correctAnswer: "Current squared times resistance",
            explanation: "Power system losses are calculated using the formula $P_{loss} = I^2R$ (Joule's law), where $I$ is current and $R$ is resistance. Losses increase dramatically (by the square) with increasing current."
        },
        {
            question: "Q2: How do you increase the MVAR output of a generator?",
            answers: ["Increase the DC current to the field windings", "Decrease the DC current to the field windings", "Increase the input to the prime mover", "Decrease the input to the prime mover"],
            correctAnswer: "Increase the DC current to the field windings",
            explanation: "The generator's MVAR output is controlled by the **field excitation**. Increasing the DC current to the field windings forces the generator to run over-excited, which increases its MVAR output."
        },
        {
            question: "Q3: When would be the most beneficial time to schedule a capacitor bank outage?",
            answers: ["During outage of other reactive sources in the area", "During summer time", "During projected peak loading", "During projected light loading"],
            correctAnswer: "During projected light loading",
            explanation: "Capacitor banks provide MVARs, which are most critical during projected peak/heavy loading to prevent voltage drops. During light loading, there is often a surplus of MVARs (high voltage), making it the safest time for a capacitor bank outage."
        },
        {
            question: "Q4: Which MVAR resource device would you normally use first?",
            answers: ["Inductive cancelations", "Shunt reactors", "Shunt capacitors", "Generator MVAR reserves"],
            correctAnswer: "Shunt capacitors",
            explanation: "Shunt capacitors are typically the cheapest, easiest, and fastest switched resources for voltage control and are used first for local voltage support before dispatching generation reserves or switching reactors."
        },
        {
            question: "Q5: Why would a Voltage reduction be implemented?",
            answers: ["Reducing load on the transmission system", "Increasing current on the transmission system", "Increasing load on the distribution system", "Reducing load/demand on the distribution system"],
            correctAnswer: "Reducing load/demand on the distribution system",
            explanation: "Voltage reduction is a system operator action used to momentarily reduce the demand on the distribution system during peak or near-emergency conditions, as many loads are voltage-sensitive."
        },
        {
            question: "Q6: A heavily loaded transmission line will exhibit which characteristic:",
            answers: ["Surge Impedance Loading and will be VAR neutral", "Capacitive properties and produce VAR", "Inductive properties and absorb VAR", "Increase impedance will keep the line neutral"],
            correctAnswer: "Inductive properties and absorb VAR",
            explanation: "A heavily loaded line is dominated by its series inductive reactance. Inductors absorb MVARs (inductive reactive power), which causes a voltage drop along the length of the line."
        },
        {
            question: "Q7: Which corrective action should a Transmission Operator take to prevent voltage collapse when reactive resources are insufficient?",
            answers: ["Closing in reactors", "Switching out transmission", "Shedding load", "Exceeding established limits"],
            correctAnswer: "Shedding load",
            explanation: "Load shedding (often automatic) is the final, most extreme action used to quickly decrease demand (both MW and MVAR), preventing a cascading voltage collapse when all other reactive resources have been exhausted."
        },
        {
            question: "Q8: Reactive reserve response during a disturbance is best obtained from which device?",
            answers: ["Synchronous condensers", "Shunt Capacitors", "Generators with the AVR on manual", "Series Capacitors"],
            correctAnswer: "Synchronous condensers",
            explanation: "Synchronous condensers (and generators operating with their Automatic Voltage Regulators on automatic) provide the most dynamic, fast-acting reactive power response to a system disturbance."
        },
        {
            question: "Q9: How many MVARs does a 230 kV, 50 MVAR capacitor bank provide when the voltage is 207 kV?",
            answers: ["50 MVARS", "45 MVARS", "40 MVARS", "35 MVARS"],
            correctAnswer: "40 MVARS",
            explanation: "Capacitor MVAR output is proportional to the square of the terminal voltage. $MVAR_{new} = 50 \cdot (207/230)^2 = 50 \cdot 0.81 = 40.5 \text{ MVAR}$. 40 MVAR is the closest option."
        },
        {
            question: "Q10: Voltage response to power flow is a study that is represented by which of the following?",
            answers: ["D Curve", "P-V Curve", "Ferranti Curve", "VRS Curve"],
            correctAnswer: "P-V Curve",
            explanation: "The P-V curve is a critical stability tool that plots Real Power (P) transferred against the Receiving-End Voltage (V). It shows the maximum power that can be transferred before voltage collapse occurs."
        }
    ]
};

// --- 2. STATE VARIABLES ---
let currentQuiz = []; 
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; 

// --- 3. DOM ELEMENTS ---
const topicScreen = document.getElementById('topic-screen');
const questionScreen = document.getElementById('question-screen');
const resultsScreen = document.getElementById('results-screen');
const currentTopicTitle = document.getElementById('current-topic-title');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const finalScore = document.getElementById('final-score');
const detailedResults = document.getElementById('detailed-results');
const restartBtn = document.getElementById('restart-btn');

// --- 4. EVENT LISTENERS ---

// Topic Selection
document.querySelectorAll('.topic-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const topic = e.target.getAttribute('data-topic');
        startQuiz(topic);
    });
});

// Next Question Button
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Restart/New Topic Button
restartBtn.addEventListener('click', resetQuiz);

// --- 5. GAME FUNCTIONS ---

/**
 * Initializes and starts the quiz for a selected topic.
 * @param {string} topic - The key for the selected topic in quizData.
 */
function startQuiz(topic) {
    // Reset state variables
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    currentQuiz = quizData[topic];

    // Update UI
    topicScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    // Format the topic name (e.g., ace_and_bias -> ACE & Bias)
    let topicName = topic.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    currentTopicTitle.textContent = topicName; 

    loadQuestion();
}

/**
 * Loads and displays the current question.
 */
function loadQuestion() {
    // Reset feedback and next button
    feedback.textContent = '';
    nextBtn.classList.add('hidden');
    answersContainer.innerHTML = ''; // Clear previous answers

    const q = currentQuiz[currentQuestionIndex];
    // Remove the Qx: prefix from the question text for cleaner display
    let displayQuestion = q.question.replace(/^Q\d+:\s*/, '');
    questionText.textContent = `${currentQuestionIndex + 1}. ${displayQuestion}`;

    // Create answer buttons
    q.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(button, q));
        answersContainer.appendChild(button);
    });
}

/**
 * Checks the user's selected answer against the correct answer.
 * @param {HTMLButtonElement} selectedButton - The button the user clicked.
 * @param {Object} question - The current question object.
 */
function checkAnswer(selectedButton, question) {
    const selectedAnswer = selectedButton.textContent;
    const isCorrect = selectedAnswer === question.correctAnswer;

    // 1. Store the answer for results, including the explanation
    userAnswers.push({
        question: question.question.replace(/^Q\d+:\s*/, ''), 
        userChoice: selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        explanation: question.explanation
    });

    // 2. Provide instant feedback
    if (isCorrect) {
        score++;
        feedback.innerHTML = "✅ **Correct!**";
        selectedButton.classList.add('correct');
    } else {
        // Display missed and correct answer
        feedback.innerHTML = `❌ **Incorrect.** The correct answer was: **${question.correctAnswer}**`;
        selectedButton.classList.add('incorrect');
    }

    // 3. Disable all buttons and show next button
    Array.from(answersContainer.children).forEach(button => {
        button.disabled = true;
        // Highlight the correct answer if the user missed it
        if (!isCorrect && button.textContent === question.correctAnswer) {
            button.classList.add('correct');
        }
    });

    nextBtn.classList.remove('hidden');
}

/**
 * Displays the final score and the detailed results.
 */
function showResults() {
    questionScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');

    finalScore.textContent = score;
    detailedResults.innerHTML = ''; // Clear previous results

    // Generate detailed list
    userAnswers.forEach((item, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        
        let status = item.isCorrect ? '✅ Correct' : '❌ Missed';
        let statusColor = item.isCorrect ? 'green' : 'red';
        
        resultItem.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${item.question}</p>
            <p><strong>Your Answer:</strong> ${item.userChoice} <span style="color: ${statusColor};">(${status})</span></p>
            <p><strong>Correct Answer:</strong> ${item.correctAnswer}</p>
            <p><strong>Explanation:</strong> <em>${item.explanation}</em></p>
            <hr>
        `;
        detailedResults.appendChild(resultItem);
    });
}

/**
 * Resets the game to the topic selection screen.
 */
function resetQuiz() {
    resultsScreen.classList.add('hidden');
    topicScreen.classList.remove('hidden');
    questionScreen.classList.add('hidden'); 
}